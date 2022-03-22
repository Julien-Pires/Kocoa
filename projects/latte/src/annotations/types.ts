export interface DefaultName {
    kind: 'default';
    name: string;
}

export interface CustomName {
    kind: 'custom';
    name: string;
}

export interface TestAnnotation {
    name: string;
    function: Function;
}

export interface TestDataAnnotation {
    args: unknown[];
    name?: string;
}

export interface CategoryAnnotation {
    name: string;
}
