import 'reflect-metadata';

const R = global.Reflect;

declare global {
    namespace Reflect {
        export function appendMetadata<T>(
            metadataKey: unknown,
            metadataValue: T,
            target: object
        ): void;
        export function appendMetadata<T>(
            metadataKey: unknown,
            metadataValue: T,
            target: object,
            propertyKey: string | symbol
        ): void;

        export function getAllMetadata<T>(metadataKey: unknown, target: object): T[];
        export function getAllMetadata<T>(metadataKey: unknown, target: object, propertyKey: string | symbol): T[];
    }
}

(R as any).appendMetadataImpl = <T>(
    metadataKey: unknown,
    metadataValue: T,
    target: object,
    propertyKey: string | symbol
): void => {
    const existingMetadata: T[] = R.getMetadata(metadataKey, target, propertyKey) ?? [];
    R.defineMetadata(metadataKey, [...existingMetadata, metadataValue], target, propertyKey);
};

(R as any).getAllMetadataImpl = <T>(metadataKey: unknown, target: object, propertyKey: string | symbol): T[] => {
    return R.getMetadata(metadataKey, target, propertyKey) ?? [];
};
