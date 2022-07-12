import { TestDataAnnotation, TestDataOptions } from '../annotations.js';
import { setAnnotation } from '../core/index.js';
import { TestFunctionAnnotation } from './types.js';

/**
 * Represents possible variations for testData arguments.
 */
type TestDataArgs<TArgs extends readonly unknown[]> =
    | [...args: TArgs]
    | [...args: TArgs, options: TestDataOptions]
    | [options: TestDataOptions];

/**
 * Checks if specified value is an instance of TestDataOptions.
 * @param options Value to check against.
 * @returns Returns true if the value is an instance of TestDataOptions otherwise false.
 */
function isTestCaseOptions(options: unknown): options is TestDataOptions {
    return (options as TestDataOptions)?.expected !== undefined;
}

/**
 * Extracts test case data and options from an arguments list.
 * @param args Represents the list of arguments to process.
 * @returns Returns a tuple with test data and test options.
 */
function destructureArgs(args: readonly unknown[]): [readonly unknown[], TestDataOptions] {
    if (args.length === 0) {
        return [[], {}];
    }

    if (isTestCaseOptions(args[args.length - 1])) {
        return [args.slice(0, args.length - 1), args[args.length - 1] as TestDataOptions];
    }

    return [args, {}];
}

/**
 * Provides a data source for a single test on a test method.
 * @param args Represents a list of data to pass to the test method.
 */
export function testData<TArgs extends readonly unknown[]>(
    ...args: TestDataArgs<TArgs>
): TestFunctionAnnotation<TArgs> {
    return (target: object, propertyKey: string): void => {
        const [testDataArgs, options] = destructureArgs(args);
        const testDataAnnotation = TestDataAnnotation({ args: () => [testDataArgs], options });

        return setAnnotation(testDataAnnotation, target, propertyKey);
    };
}
