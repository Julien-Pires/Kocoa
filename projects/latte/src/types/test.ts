export interface TestGroup {
    name: string;
}

export interface TestCase {
    name: string;
    args: unknown[];
}

export interface Test {
    function: Function;
    cases: TestCase[];
}
