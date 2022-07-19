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

export interface AnnotationStatic<TDefinition extends AnnotationDefinition, TAnnotation> {
    <TTarget, TProperty = unknown>(
        decorator: (...args: AnnotationArgs<TDefinition, TTarget, TProperty>) => TAnnotation
    ): (...args: AnnotationArgs<TDefinition, TTarget, TProperty>) => void;
    _definition: TDefinition;
}
