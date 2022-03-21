export interface DefaultName {
    kind: 'default';
    name: string;
}

export interface CustomName {
    kind: 'custom';
    name: string;
}

export interface TestCaseAnnotation {
    name: DefaultName | CustomName;
    args: unknown[];
    function: Function;
}

export interface CategoryAnnotation {
    name: string;
}
