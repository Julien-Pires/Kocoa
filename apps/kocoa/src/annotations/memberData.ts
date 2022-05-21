import { testDataSymbol } from '../metadata.js';
import * as Reflect from '../reflect.js';

type MemberData<TData extends unknown[]> = Iterable<TData> | ((...args: unknown[]) => Iterable<TData>);

type IterableFunctionParameters<TMember extends MemberData<unknown[]>> = TMember extends (
    ...args: infer TArgs
) => Iterable<unknown[]>
    ? TArgs
    : [];

type MemberDataValues<TMember> = TMember extends MemberData<infer TData> ? TData : never;

export const memberData = <TMember extends MemberData<unknown[]>>(
    member: TMember,
    ...args: IterableFunctionParameters<TMember>
) => {
    return (
        target: object,
        propertyKey: string,
        _descriptor: TypedPropertyDescriptor<(...args: MemberDataValues<TMember>) => unknown>
    ) => {
        const testDataAnnotation = {
            args: () => {
                if (member instanceof Function) {
                    return member(...args);
                }

                return member;
            },
            options: {}
        };

        Reflect.appendMetadata(testDataSymbol, testDataAnnotation, target, propertyKey);
    };
};
