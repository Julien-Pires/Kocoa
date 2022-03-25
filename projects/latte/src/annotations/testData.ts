import { testDataSymbol } from './metadata';
import { TestDataOptions } from './types';

/**
 * Represents possible combination for test case parameters
 */
type TestDataArgs<TArgs extends readonly unknown[]> = 
    | [...args: TArgs]
    | [options: TestDataOptions]  
    | [...args: TArgs, options: TestDataOptions];

/**
 * Represents test method parameters
 */
type TestFunctionArgs<TArgs extends readonly unknown[]> = 
    TArgs extends [...args: infer Args, options: TestDataOptions] ? Args : 
        TArgs extends [options: TestDataOptions] ? never : TArgs;

/**
 * Checks if specified value is an instance of TestDataOptions
 * @param options Value to check against
 * @returns Returns true if the value is an instance of TestDataOptions otherwise false
 */
const isTestCaseOptions = (options: any): options is TestDataOptions => {
    return (options as TestDataOptions)?.testName !== undefined;
}

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
}

/**
 * Specifies an additional test case for the targeted test method.
 * @param args Data to be passed for this test case
 */
export const testData = <TArgs extends readonly unknown[]>(...args: TestDataArgs<TArgs>) => {
    return (target: any, propertyKey: string, _descriptor: TypedPropertyDescriptor<(...args: TestFunctionArgs<TArgs>) => unknown>): void => {
        const [testDataArgs, options] = destructureArgs(args);
        const testDataAnnotation = {
            args: testDataArgs,
            ...options.testName ? { name: options.testName } : {},
        };

        Reflect.appendMetadata(testDataSymbol, testDataAnnotation, target, propertyKey);
    };
};
