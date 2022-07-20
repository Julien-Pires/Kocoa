import { getAnnotation } from './get.js';
import { setAnnotation } from './set.js';
import { AnnotationDefinition, AnnotationStatic } from './types.js';

export function create<TAnnotation, TDefinition extends AnnotationDefinition>(
    definition: TDefinition
): AnnotationStatic<TDefinition, TAnnotation> {
    const decorator = ((apply) => {
        return (target: object, propertyKey: string | symbol, descriptor?: PropertyDescriptor) => {
            const annotationData = (apply as any)(target, propertyKey, descriptor);
            setAnnotation(
                {
                    _definition: definition,
                    ...annotationData
                },
                target,
                propertyKey
            );
        };
    }) as AnnotationStatic<TDefinition, TAnnotation>;
    decorator._definition = definition;
    decorator.get = (target: object, propertyKey?: string | symbol) => {
        return getAnnotation(definition, target, propertyKey);
    };

    return decorator;
}
