export interface TestOptions {
    skip?: boolean;
}

export interface SuiteOptions {
    skip?: boolean;
}

/**
 * Contains additional options for a test case
 */
export interface TestDataOptions {
    testName?: string;
}

/**
 * Contains test metadata
 */
export interface TestAnnotation {
    name: string;
    options: TestOptions;
}

/**
 * Contains test case metadata
 */
export interface TestDataAnnotation {
    args: unknown[];
    name?: string;
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
