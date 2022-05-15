import { Constructor } from ".";

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
    args: (target: Constructor<unknown>) => Iterable<readonly unknown[]>;
    options: TestDataOptions;
}

/**
 * Contains test suite metadata
 */
export interface SuiteAnnotation {
    name: string;
    options: SuiteOptions;
}
