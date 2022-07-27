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

type ClassAnnotationArgs<TTarget> = [target: TTarget];

type PropertyAnnotationArgs<TTarget, TProperty> = [
    target: TTarget,
    propertyKey: string | symbol,
    descriptor?: TypedPropertyDescriptor<TProperty>
];

type AnnotationArgs<
    TDefinition extends AnnotationDefinition,
    TTarget,
    TProperty
> = TDefinition['usage'] extends AnnotationUsage.Class
    ? ClassAnnotationArgs<TTarget>
    : PropertyAnnotationArgs<TTarget, TProperty>;

type GetAnnotationArgs<TDefinition extends AnnotationDefinition> = TDefinition['usage'] extends AnnotationUsage.Class
    ? [target: object]
    : [target: object, propertyKey: string | symbol];

type GetAnnotationReturn<
    TAnnotation,
    TDefinition extends AnnotationDefinition
> = TDefinition['allowMultiple'] extends true ? TAnnotation[] : TAnnotation;

export interface AnnotationStatic<TDefinition extends AnnotationDefinition, TAnnotation> {
    <TTarget = object, TProperty = unknown>(
        decorator: (...args: AnnotationArgs<TDefinition, TTarget, TProperty>) => TAnnotation
    ): (...args: AnnotationArgs<TDefinition, TTarget, TProperty>) => void;
    get(...args: GetAnnotationArgs<TDefinition>): GetAnnotationReturn<TAnnotation, TDefinition>;
    _definition: TDefinition;
}

export type AnnotationAttribute<T> = T extends AnnotationStatic<AnnotationDefinition, infer TAnnotation>
    ? TAnnotation
    : never;
