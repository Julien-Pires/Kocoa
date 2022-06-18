export type SpecData = unknown[];

export interface Spec<TFunc extends string | symbol> {
    name: string;
    function: TFunc;
    skip: boolean;
    data: () => Iterable<SpecData>;
}

export interface Suite {
    name: string;
    skip: boolean;
}
