import { testDataSymbol } from './metadata';

type TestDataArgs<TArgs extends readonly unknown[]> = 
    | [...args: TArgs]
    | [options: TestDataOptions]  
    | [...args: TArgs, options: TestDataOptions];

type TestFunctionArgs<TArgs extends unknown[]> = 
    TArgs extends [...args: infer Args, options: TestDataOptions] ? Args : 
        TArgs extends [options: TestDataOptions] ? never : TArgs;

export interface TestDataOptions {
    testName?: string;
};

const isTestCaseOptions = (options: any): options is TestDataOptions => {
    return (options as TestDataOptions)?.testName !== undefined;
}

const destructureArgs = (args: readonly unknown[]): [readonly unknown[], TestDataOptions] => {
    if (args.length === 0) {
        return [[], {}];
    }

    if (isTestCaseOptions(args[args.length - 1])) {
        return [args.slice(0, args.length - 1), args[args.length - 1] as TestDataOptions];
    }

    return [args, {}];
}

export const testData = <TArgs extends unknown[]>(...args: TestDataArgs<TArgs>) => {
    return (target: any, propertyKey: string, _descriptor: TypedPropertyDescriptor<(...args: TestFunctionArgs<TArgs>) => unknown>) => {
        const [testArgs, options] = destructureArgs(args);
        const testCase = {
            args: testArgs,
            ...options.testName ? { name: options.testName } : {},
        };

        Reflect.appendMetadata(testDataSymbol, testCase, target, propertyKey);
    };
};
