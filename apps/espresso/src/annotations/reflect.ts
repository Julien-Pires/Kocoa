import 'reflect-metadata';

type AppendMetadata = {
    <T>(metadataKey: unknown, metadataValue: T, target: object): void;
    <T>(metadataKey: unknown, metadataValue: T, target: object, propertyKey: string | symbol): void;
};

type GetAllMetadata = {
    <T>(metadataKey: unknown, target: object): T[];
    <T>(metadataKey: unknown, target: object, propertyKey: string | symbol): T[];
};

export const appendMetadata = (<T>(
    metadataKey: unknown,
    metadataValue: T,
    target: object,
    propertyKey: string | symbol
): void => {
    const existingMetadata: T[] = Reflect.getMetadata(metadataKey, target, propertyKey) ?? [];
    Reflect.defineMetadata(metadataKey, [...existingMetadata, metadataValue], target, propertyKey);
}) as AppendMetadata;

export const getAllMetadata = (<T>(metadataKey: unknown, target: object, propertyKey: string | symbol): T[] => {
    return Reflect.getMetadata(metadataKey, target, propertyKey) ?? [];
}) as GetAllMetadata;
