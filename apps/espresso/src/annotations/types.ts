export interface TestOptions {
    name?: string;
    skip?: boolean;
}

export interface SuiteOptions {
    skip?: boolean;
}

/**
 * Contains additional options for a test case
 */
export interface TestDataOptions {
    expected?: unknown;
}

/**
 * Contains test metadata
 */
export interface TestAnnotation {
    function: string;
    options: TestOptions;
}

/**
 * Contains test case metadata
 */
export interface TestDataAnnotation {
    args: unknown[];
    options: TestDataOptions;
}

/**
 * Contains test suite metadata
 */
export interface SuiteAnnotation {
    name: string;
    options: SuiteOptions;
}

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

export type TypedDecorator<TArgs extends readonly unknown[]> = (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<(...args: TestFunctionArgs<TArgs>) => unknown>
) => void;

export type Constructor<T> = new () => T;
