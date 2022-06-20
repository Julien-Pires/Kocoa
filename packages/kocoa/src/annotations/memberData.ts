import { testDataSymbol } from '../annotation/metadata.js';
import * as Reflect from '../annotation/reflect.js';
import { TestFunctionAnnotation } from './types.js';

/**
 * Represents a test data source.
 */
type DataSource<TData extends unknown[]> = Iterable<TData> | ((...args: readonly unknown[]) => Iterable<TData>);

/**
 * Gets types for a single data source row.
 */
type DataSourceRow<TMember> = TMember extends DataSource<infer TData> ? TData : never;

/**
 * Extract function arguments types when data source is a function.
 */
type ExtractDataSourceParameters<TMember extends DataSource<unknown[]>> = TMember extends (
    ...args: infer TArgs
) => Iterable<unknown[]>
    ? TArgs
    : [];

/**
 * Provides a data source for a test method. Each entry of the iterable will create a new test case.
 * @param member Member that represents the data source. It can be either an iterable or a function that returns
 * an iterable.
 * @param memberArgs Represents a list of arguments to apply on the member when member is a function.
 */
export const memberData = <TMember extends DataSource<unknown[]>>(
    member: TMember,
    ...memberArgs: ExtractDataSourceParameters<TMember>
): TestFunctionAnnotation<DataSourceRow<TMember>> => {
    return (target: object, propertyKey: string) => {
        const testDataAnnotation = {
            args: () => {
                if (member instanceof Function) {
                    return member(...memberArgs);
                }

                return member;
            },
            options: {}
        };

        Reflect.appendMetadata(testDataSymbol, testDataAnnotation, target, propertyKey);
    };
};
