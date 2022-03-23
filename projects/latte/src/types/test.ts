export interface TestSuite {
    name: string;
}

export interface TestCase {
    args: unknown[];
    name?: string;
}

export interface Test {
    name: string;
    function: Function;
    cases: TestCase[];
}
