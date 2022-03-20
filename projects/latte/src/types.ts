export interface TestCase {
    name: string;
    args: unknown[];
    function: Function;
}

export interface TestGroup {
    name: string;
}

export interface TestNode {
    name: string | undefined,
    children: (TestCase | TestNode)[];
}

export interface TestTree {
    target: any;
    root: TestNode;
}
