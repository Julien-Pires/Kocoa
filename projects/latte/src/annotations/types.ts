export interface TestDataOptions {
    testName?: string;
};

export interface TestAnnotation {
    name: string;
    function: Function;
}

export interface TestDataAnnotation {
    args: unknown[];
    name?: string;
}

export interface TestSuiteAnnotation {
    name: string;
}
