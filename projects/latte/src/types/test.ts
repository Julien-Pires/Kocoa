/**
 * Represents a test suite.
 */
export interface TestSuite {
    name: string;
    skip: boolean;
}

/**
 * Represents a test case.
 */
export interface TestCase {
    args: unknown[];
    name?: string;
}

/**
 * Represents a test.
 */
export interface Test {
    name: string;
    function: Function;
    cases: TestCase[];
    skip: boolean;
}
