import { testDataSymbol } from '../metadata.js';
import * as Reflect from '../reflect.js';

/**
 * Represents all possible types of data source.
 */
type MemberData<TData extends unknown[]> = Iterable<TData> | ((...args: unknown[]) => Iterable<TData>);

/**
 * Extracts arguments list when data source is a function.
 */
type ExtractIterableFunctionParameters<TMember extends MemberData<unknown[]>> = TMember extends (
    ...args: infer TArgs
) => Iterable<unknown[]>
    ? TArgs
    : [];

/**
 * Get the list of data returned by the data source.
 */
type MemberDataValues<TMember> = TMember extends MemberData<infer TData> ? TData : never;

/**
 * Provides a data source for a test method. Each entry of the iterable will create a new test case.
 * @param member Member that represents the data source. It can be either an iterable or a function that returns
 * an iterable.
 * @param args Represents a list of arguments to apply on the member when member is a function.
 */
export const memberData = <TMember extends MemberData<unknown[]>>(
    member: TMember,
    ...args: ExtractIterableFunctionParameters<TMember>
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
