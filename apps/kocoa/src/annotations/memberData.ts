import { TestFunctionArgs } from "./types";

type MemberDataArgs<TArgs extends unknown[]> = Iterable<TArgs>;

type Data<TClass, TProperty extends keyof TClass> = 
    TClass extends { [key in TProperty]: MemberDataArgs<infer Args> } ? Args : never

export const memberData = <TProperty extends string | symbol>(dataProperty: TProperty) => {
    return <TClass extends { [key in TProperty]: MemberDataArgs<unknown[]> }>(
        target: TClass, 
        propertyKey: string, 
        descriptor: TypedPropertyDescriptor<(...args: TestFunctionArgs<Data<TClass, TProperty>>
    ) => unknown>) => {};
};
