import 'reflect-metadata';

import { AnnotationDefinition } from './types.js';

type AnnotationReturn<TAnnotation, TDefinition extends AnnotationDefinition> = TDefinition['allowMultiple'] extends true
    ? TAnnotation[]
    : TAnnotation;

function hasPrototype(value: unknown): value is { prototype: object } {
    return (value as { prototype: object })?.prototype !== undefined;
}

function getAllMetadata<T>(metadataKey: unknown, target: object): T[];
function getAllMetadata<T>(metadataKey: unknown, target: object, propertyKey?: string | symbol): T[] {
    return (
        (propertyKey
            ? Reflect.getMetadata(metadataKey, target, propertyKey)
            : Reflect.getMetadata(metadataKey, target)) ?? []
    );
}

export function getAnnotation<TAnnotation, TDefinition extends AnnotationDefinition>(
    definition: TDefinition,
    target: object,
    propertyKey?: string | symbol
): AnnotationReturn<TAnnotation, TDefinition> {
    const get = definition.allowMultiple ? getAllMetadata : Reflect.getMetadata;
    const propertyTarget = hasPrototype(target) ? target.prototype : target;
    const annotations = propertyKey ? get(definition.key, propertyTarget, propertyKey) : get(definition.key, target);

    return annotations ?? null;
}
