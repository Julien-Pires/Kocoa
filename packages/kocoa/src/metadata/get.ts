function hasPrototype(value: unknown): value is { prototype: object } {
    return (value as { prototype: object })?.prototype !== undefined;
}

function getAllMetadata<T>(metadataKey: unknown, target: object): T[];
function getAllMetadata<T>(metadataKey: unknown, target: object, propertyKey?: string | symbol): T[] {
    return Reflect.getMetadata(metadataKey, target, propertyKey) ?? [];
}

export function getAnnotation<TAnnotation extends Annotation<AnnotationDefinition>>(
    annotation: TAnnotation,
    target: object,
    ...[propertyKey]: RequiredPropertyKey<TAnnotation>
): AnnotationReturn<TAnnotation> {
    const { _definition: definition } = annotation;
    const get = definition.allowMultiple ? getAllMetadata : Reflect.getMetadata;
    const propertyTarget = hasPrototype(target) ? target.prototype : target;
    const annotations = propertyKey ? get(definition.key, propertyTarget, propertyKey) : get(definition.key, target);

    return annotations ?? null;
}
