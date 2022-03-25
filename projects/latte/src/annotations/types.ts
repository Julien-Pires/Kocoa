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
    function: Function;
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
export interface TestSuiteAnnotation {
    name: string;
}
