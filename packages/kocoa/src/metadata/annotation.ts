import { PrototypeKeys } from '@kocoa/core';

import { getAnnotation } from './get.js';
import { setAnnotation } from './set.js';
import { Annotation, AnnotationDefinition } from './types.js';

type Decorator<TResult> = (target: object, propertyKey: string | symbol, descriptor?: PropertyDescriptor) => TResult;

function isDecorator(value: unknown): value is Decorator<unknown> {
    return typeof value === 'function';
}

export function create<TAnnotation, TDefinition extends AnnotationDefinition>(
    definition: TDefinition
): Annotation<TDefinition, TAnnotation> {
    const decorator = ((annotation: Decorator<TAnnotation> | TAnnotation): Decorator<void> => {
        return (target: object, propertyKey: string | symbol, descriptor?: PropertyDescriptor) => {
            const annotationData = isDecorator(annotation) ? annotation(target, propertyKey, descriptor) : annotation;
            return setAnnotation(
                {
                    definition: definition,
                    ...annotationData
                },
                target,
                propertyKey
            );
        };
    }) as Annotation<TDefinition, TAnnotation>;
    decorator.definition = definition;
    decorator.get = <TTarget>(target: TTarget, propertyKey?: PrototypeKeys<TTarget>) =>
        getAnnotation<TAnnotation, TDefinition, TTarget>(definition, target, propertyKey);

    return decorator;
}
