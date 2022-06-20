export type SpecArgs = readonly unknown[];

export interface Spec<TFunc extends string | symbol> {
    name: string;
    function: TFunc;
    skip: boolean;
    data: SpecArgs;
}

export interface Suite {
    name: string;
    skip: boolean;
}
