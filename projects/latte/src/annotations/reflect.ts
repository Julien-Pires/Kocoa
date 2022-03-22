export {}

declare global {
    namespace Reflect {
        function appendMetadata<T>(metadataKey: any, metadataValue: T, target: Object): void;
        function appendMetadata<T>(metadataKey: any, metadataValue: T, target: Object, propertyKey: string | symbol): void;
        function getAllMetadata<T>(metadataKey: any, target: Object): T[];
        function getAllMetadata<T>(metadataKey: any, target: Object, propertyKey: string | symbol): T[];
    }
}

Reflect.appendMetadata = function <T>(metadataKey: any, metadataValue: any, target: Object, propertyKey: string | symbol): void {
    const existingMetadata: T[] = Reflect.getMetadata(metadataKey, target, propertyKey) ?? [];
    Reflect.defineMetadata(metadataKey, [...existingMetadata, metadataValue], target, propertyKey);
} as any

Reflect.getAllMetadata = function <T>(metadataKey: any, target: Object, propertyKey: string | symbol): T[] {
    return Reflect.getMetadata(metadataKey, target, propertyKey) ?? [];
} as any
