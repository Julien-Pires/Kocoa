import { testCaseSymbol } from './metadata';

type TestCaseArgs<TArgs extends readonly unknown[]> = 
    | [...args: TArgs]
    | [options: TestCaseOptions]  
    | [...args: TArgs, options: TestCaseOptions];

type TestFunctionArgs<TArgs extends unknown[]> = 
    TArgs extends [...args: infer Args, options: TestCaseOptions] ? Args : 
        TArgs extends [options: TestCaseOptions] ? never : TArgs;

export interface TestCaseOptions {
    name?: string;
};

const isTestCaseOptions = (options: any): options is TestCaseOptions => {
    return (options as TestCaseOptions)?.name !== undefined;
}

const destructureArgs = (args: readonly unknown[]): [readonly unknown[], TestCaseOptions] => {
    if (args.length === 0) {
        return [[], {}];
    }

    if (isTestCaseOptions(args[args.length - 1])) {
        return [args.slice(0, args.length - 1), args[args.length - 1] as TestCaseOptions];
    }

    return [args, {}];
}

export const testCase = <TArgs extends unknown[]>(...args: TestCaseArgs<TArgs>) => {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: TestFunctionArgs<TArgs>) => unknown>) => {
        const [testArgs, options] = destructureArgs(args);
        const testCases = Reflect.getMetadata(testCaseSymbol, target, propertyKey) ?? [];
        const newTestCase = {
            name: options.name ? {
                kind: 'custom',
                name: options.name
            } : {
                kind: 'default',
                name: propertyKey
            },
            args: testArgs,
            function: descriptor.value
        };

        Reflect.defineMetadata(testCaseSymbol, [newTestCase, ...testCases], target, propertyKey);
    };
};
