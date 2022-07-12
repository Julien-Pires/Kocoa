export enum AnnotationUsage {
    All,
    Class,
    Method
}

export interface AnnotationDefinition {
    readonly key: string;
    readonly usage: AnnotationUsage;
    readonly allowMultiple: boolean;
}

export interface Annotation<TDefinition extends AnnotationDefinition> {
    _definition: TDefinition;
}

export interface AnnotationStatic<TDefinition extends AnnotationDefinition, TAnnotation> {
    (annotation: Omit<TAnnotation, '_definition'>): Annotation<TDefinition> & TAnnotation;
    _definition: TDefinition;
}

type ExtractDefinition<TAnnotation extends Annotation<AnnotationDefinition>> = TAnnotation['_definition'];

export function createAnnotation<TAnnotation extends Annotation<AnnotationDefinition>>(
    definition: ExtractDefinition<TAnnotation>
): AnnotationStatic<ExtractDefinition<TAnnotation>, TAnnotation> {
    const annotation = ((annotationData) => {
        return {
            _definition: definition,
            ...annotationData
        };
    }) as AnnotationStatic<ExtractDefinition<TAnnotation>, TAnnotation>;
    annotation._definition = definition;

    return annotation;
}
