export {}

declare global {
    namespace Reflect {
        function appendMetadata<T>(metadataKey: any, metadataValue: T, target: Object): void
        function appendMetadata<T>(metadataKey: any, metadataValue: T, target: Object, propertyKey: string | symbol): void
    }
}

Reflect.appendMetadata = function <T>(metadataKey: any, metadataValue: any, target: Object, propertyKey: string | symbol): void {
    const existingMetadata: T[] = Reflect.getMetadata(metadataKey, target, propertyKey) ?? [];
    Reflect.defineMetadata(metadataKey, [...existingMetadata, metadataValue], target, propertyKey);
} as any