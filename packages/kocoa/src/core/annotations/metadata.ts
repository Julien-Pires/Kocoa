import { AnnotationEventEmitter } from './events.js';
import { Annotation, AnnotationDefinition, AnnotationStatic, AnnotationUsage } from './types.js';

type RequiredPropertyKey<TAnnotation extends Annotation<AnnotationDefinition>> =
    TAnnotation['_definition']['usage'] extends AnnotationUsage.All
        ? [propertyKey?: string | symbol]
        : TAnnotation['_definition']['usage'] extends AnnotationUsage.Class
        ? []
        : [propertyKey: string | symbol];

type ExtractAnnotation<TAnnotation extends Annotation<AnnotationDefinition>> = TAnnotation extends AnnotationStatic<
    AnnotationDefinition,
    infer T
>
    ? T
    : TAnnotation;

type AnnotationReturn<TAnnotation extends Annotation<AnnotationDefinition>> =
    TAnnotation['_definition']['allowMultiple'] extends true
        ? ExtractAnnotation<TAnnotation>[]
        : ExtractAnnotation<TAnnotation> | null;

function hasPrototype(value: unknown): value is { prototype: object } {
    return (value as { prototype: object })?.prototype !== undefined;
}

export const annotationsEvents = new AnnotationEventEmitter();

export function setAnnotation<TAnnotation extends Annotation<AnnotationDefinition>>(
    annotation: TAnnotation,
    target: object,
    ...[propertyKey]: RequiredPropertyKey<TAnnotation>
): void {
    const { _definition: definition } = annotation;
    const set = definition.allowMultiple ? Reflect.appendMetadata : Reflect.defineMetadata;
    if (propertyKey) {
        set(definition.key, annotation, target, propertyKey);
    } else {
        set(definition.key, annotation, target);
    }

    annotationsEvents.emit(annotation, 'Added', target, propertyKey);
}

export function getAnnotation<TAnnotation extends Annotation<AnnotationDefinition>>(
    annotation: TAnnotation,
    target: object,
    ...[propertyKey]: RequiredPropertyKey<TAnnotation>
): AnnotationReturn<TAnnotation> {
    const { _definition: definition } = annotation;
    const get = definition.allowMultiple ? Reflect.getAllMetadata : Reflect.getMetadata;
    const propertyTarget = hasPrototype(target) ? target.prototype : target;
    const annotations = propertyKey ? get(definition.key, propertyTarget, propertyKey) : get(definition.key, target);

    return annotations ?? null;
}
