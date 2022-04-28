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
    function: Function;
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
