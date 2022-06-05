export interface Spec<TFunc extends string | symbol> {
    name: string;
    function: TFunc;
    skip: boolean;
    data: () => Iterable<unknown[]>;
}

export interface Suite {
    name: string;
}
