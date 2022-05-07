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
}

/**
 * Represents a test.
 */
export interface Test {
    name: string;
    function: string;
    cases: TestCase[];
    skip: boolean;
}
