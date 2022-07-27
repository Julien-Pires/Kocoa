import { TestDataAnnotation } from '../annotations.js';

interface TestDataOptions {
    expected?: unknown;
}

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
 * @param data Represents a list of data to pass to the test method.
 */
export function testData<TArgs extends readonly unknown[]>(...data: TestDataArgs<TArgs>) {
    return TestDataAnnotation<object, (...args: TArgs) => unknown>(() => {
        const [testDataArgs, options] = destructureArgs(data);
        return { args: () => [testDataArgs], options };
    });
}
