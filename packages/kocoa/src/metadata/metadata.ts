import 'reflect-metadata';

import { Annotation, AnnotationDefinition, AnnotationStatic, AnnotationUsage } from './types.js';

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
