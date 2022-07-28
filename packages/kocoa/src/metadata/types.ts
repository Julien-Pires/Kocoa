import { PrototypeKeys } from '@kocoa/core';

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

type GetAnnotationArgs<
    TDefinition extends AnnotationDefinition,
    TTarget
> = TDefinition['usage'] extends AnnotationUsage.Class
    ? [target: TTarget]
    : [target: TTarget, propertyKey: PrototypeKeys<TTarget>];

type GetAnnotationReturn<
    TDefinition extends AnnotationDefinition,
    TAnnotation
> = TDefinition['allowMultiple'] extends true ? TAnnotation[] : TAnnotation;

type DecoratorArgs<
    TDefinition extends AnnotationDefinition,
    TTarget,
    TProperty
> = TDefinition['usage'] extends AnnotationUsage.Class
    ? [target: TTarget]
    : [target: TTarget, propertyKey: string | symbol, descriptor?: TypedPropertyDescriptor<TProperty>];

type Decorator<TDefinition extends AnnotationDefinition, TTarget, TProperty> = (
    ...args: DecoratorArgs<TDefinition, TTarget, TProperty>
) => void;

type CreateAnnotation<TDefinition extends AnnotationDefinition, TAnnotation, TTarget, TProperty> = (
    ...args: DecoratorArgs<TDefinition, TTarget, TProperty>
) => TAnnotation;

export interface Annotation<TDefinition extends AnnotationDefinition, TAnnotation> {
    <TTarget, TProperty = string | symbol>(
        builder: CreateAnnotation<TDefinition, TAnnotation, TTarget, TProperty> | TAnnotation
    ): Decorator<TDefinition, TTarget, TProperty>;
    get<TTarget>(...args: GetAnnotationArgs<TDefinition, TTarget>): GetAnnotationReturn<TDefinition, TAnnotation>;
    definition: TDefinition;
}

export type AnnotationAttribute<T> = T extends Annotation<AnnotationDefinition, infer TAnnotation>
    ? TAnnotation
    : never;
