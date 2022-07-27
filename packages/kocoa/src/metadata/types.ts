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

export type PrototypeKeys<T> = T extends { prototype: infer TProto }
    ? Exclude<keyof TProto, number>
    : Exclude<keyof T, number>;

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

type GetAnnotationArgs<
    TDefinition extends AnnotationDefinition,
    TTarget extends object
> = TDefinition['usage'] extends AnnotationUsage.Class
    ? [target: TTarget]
    : [target: TTarget, propertyKey: PrototypeKeys<TTarget>];

type GetAnnotationReturn<
    TAnnotation,
    TDefinition extends AnnotationDefinition
> = TDefinition['allowMultiple'] extends true ? TAnnotation[] : TAnnotation;

export interface Annotation<TDefinition extends AnnotationDefinition, TAnnotation> {
    <TTarget = object, TProperty = unknown>(annotation: TAnnotation): (
        ...args: AnnotationArgs<TDefinition, TTarget, TProperty>
    ) => void;
    <TTarget = object, TProperty = unknown>(
        decorator: (...args: AnnotationArgs<TDefinition, TTarget, TProperty>) => TAnnotation
    ): (...args: AnnotationArgs<TDefinition, TTarget, TProperty>) => void;
    get<T extends object>(...args: GetAnnotationArgs<TDefinition, T>): GetAnnotationReturn<TAnnotation, TDefinition>;
    _definition: TDefinition;
}

export type AnnotationAttribute<T> = T extends Annotation<AnnotationDefinition, infer TAnnotation>
    ? TAnnotation
    : never;
