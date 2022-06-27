/**
 * Represents a set of options for a test
 */
export interface TestOptions {
    skip: boolean;
}

/**
 * Represents a set of options for a test suite
 */
export interface SuiteOptions {
    skip: boolean;
}

/**
 * Represents a set of options for test data
 */
export interface TestDataOptions {
    expected?: unknown;
}

/**
 * Provides information about a test method
 */
export interface TestAnnotation {
    name: string;
    function: string | symbol;
    options: TestOptions;
}

/**
 * Provides a data source for a test
 */
export interface TestDataAnnotation {
    args: () => Iterable<readonly unknown[]>;
    options: TestDataOptions;
}

/**
 * Provides information about a test suite
 */
export interface SuiteAnnotation {
    name: string;
    options: SuiteOptions;
}
