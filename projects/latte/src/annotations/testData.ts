import { testDataSymbol } from './metadata.js';
import * as Reflect from './reflect.js';
import { TestDataOptions, TypedDecorator } from './types.js';

/**
 * Represents possible combination for test case parameters
 */
type TestDataArgs<TArgs extends readonly unknown[]> =
    | [...args: TArgs]
    | [...args: TArgs, options: TestDataOptions]
    | [options: TestDataOptions];

/**
 * Checks if specified value is an instance of TestDataOptions
 * @param options Value to check against
 * @returns Returns true if the value is an instance of TestDataOptions otherwise false
 */
const isTestCaseOptions = (options: unknown): options is TestDataOptions =>
    (options as TestDataOptions)?.expected !== undefined;

/**
 * Extracts test case data and options from an arguments array
 * @param args Arguments to process
 * @returns Returns test case data separated from test case options
 */
const destructureArgs = (args: readonly unknown[]): [readonly unknown[], TestDataOptions] => {
    if (args.length === 0) {
        return [[], {}];
    }

    if (isTestCaseOptions(args[args.length - 1])) {
        return [args.slice(0, args.length - 1), args[args.length - 1] as TestDataOptions];
    }

    return [args, {}];
};

/**
 * Specifies an additional test case for the targeted test method.
 * @param args Data to be passed for this test case
 */
export const testData =
    <TArgs extends readonly unknown[]>(...args: TestDataArgs<TArgs>): TypedDecorator<TArgs> =>
    (target: object, propertyKey: string): void => {
        const [testDataArgs, options] = destructureArgs(args);
        const testDataAnnotation = {
            args: testDataArgs,
            options
        };

        Reflect.appendMetadata(testDataSymbol, testDataAnnotation, target, propertyKey);
    };
