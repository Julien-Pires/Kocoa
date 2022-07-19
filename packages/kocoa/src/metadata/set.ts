import { annotationsEvents } from './events.js';
import { Annotation, AnnotationDefinition } from './types.js';

function appendMetadata<T>(metadataKey: unknown, metadataValue: T, target: object): void;
function appendMetadata<T>(
    metadataKey: unknown,
    metadataValue: T,
    target: object,
    propertyKey?: string | symbol
): void {
    const existingMetadata: T[] = Reflect.getMetadata(metadataKey, target, propertyKey) ?? [];
    Reflect.defineMetadata(metadataKey, [...existingMetadata, metadataValue], target, propertyKey);
}

export function setAnnotation<TAnnotation extends Annotation<AnnotationDefinition>>(
    annotation: TAnnotation,
    target: object,
    ...[propertyKey]: RequiredPropertyKey<TAnnotation>
): void {
    const { _definition: definition } = annotation;
    const set = definition.allowMultiple ? appendMetadata : Reflect.defineMetadata;
    if (propertyKey) {
        set(definition.key, annotation, target, propertyKey);
    } else {
        set(definition.key, annotation, target);
    }

    annotationsEvents.emit(annotation, 'Added', target, propertyKey);
}
