import { getAnnotation } from './get.js';
import { setAnnotation } from './set.js';
import { Annotation, AnnotationDefinition, PrototypeKeys } from './types.js';

export function create<TAnnotation, TDefinition extends AnnotationDefinition>(
    definition: TDefinition
): Annotation<TDefinition, TAnnotation> {
    const decorator = ((apply: Function | object) => {
        return (target: object, propertyKey: string | symbol, descriptor?: PropertyDescriptor) => {
            const annotationData = typeof apply === 'function' ? apply(target, propertyKey, descriptor) : apply;
            return setAnnotation(
                {
                    _definition: definition,
                    ...annotationData
                },
                target,
                propertyKey
            );
        };
    }) as Annotation<TDefinition, TAnnotation>;
    decorator._definition = definition;
    decorator.get = <T extends object>(target: T, propertyKey?: PrototypeKeys<T>) =>
        getAnnotation<TAnnotation, TDefinition, T>(definition, target, propertyKey);

    return decorator;
}
