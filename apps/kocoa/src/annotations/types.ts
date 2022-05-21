import { TestDataOptions } from '../types/index.js';

/**
 * Represents test method parameters
 */
export type TestFunctionArgs<TArgs extends readonly unknown[]> = TArgs extends [
    ...args: infer Args,
    options: TestDataOptions
]
    ? Args
    : TArgs extends [options: TestDataOptions]
    ? never
    : TArgs;

export type TestFunctionAnnotation<TArgs extends readonly unknown[]> = (
    target: object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: TArgs) => unknown>
) => void;
