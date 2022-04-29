import 'reflect-metadata';

export {};

declare global {
    namespace Reflect {
        function appendMetadata<T>(metadataKey: unknown, metadataValue: T, target: object): void;
        function appendMetadata<T>(
            metadataKey: unknown,
            metadataValue: T,
            target: object,
            propertyKey: string | symbol
        ): void;
        function getAllMetadata<T>(metadataKey: unknown, target: object): T[];
        function getAllMetadata<T>(metadataKey: unknown, target: object, propertyKey: string | symbol): T[];
    }
}

Reflect.appendMetadata = function appendMetadata<T>(
    metadataKey: unknown,
    metadataValue: T,
    target: object,
    propertyKey: string | symbol
): void {
    const existingMetadata: T[] = Reflect.getMetadata(metadataKey, target, propertyKey) ?? [];
    Reflect.defineMetadata(metadataKey, [...existingMetadata, metadataValue], target, propertyKey);
} as any;

Reflect.getAllMetadata = function getAllMetadata<T>(
    metadataKey: unknown,
    target: object,
    propertyKey: string | symbol
): T[] {
    return Reflect.getMetadata(metadataKey, target, propertyKey) ?? [];
} as any;
