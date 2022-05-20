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

export type TestFunction<TArgs extends readonly unknown[]> = (...args: TestFunctionArgs<TArgs>) => unknown;
