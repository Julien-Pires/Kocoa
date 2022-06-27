import { setTestMetadata } from '../annotations/metadata.js';
import { TestOptions } from '../types/index.js';

type OptionalTestOptions = {
    [TKey in keyof TestOptions]?: TestOptions[TKey];
};

type TestDecorator = (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;

/**
 * Default values for test options
 */
const defaultOptions: TestOptions = {
    skip: false
} as const;

function isOptions(value: unknown): value is OptionalTestOptions {
    const options = value as OptionalTestOptions;

    return options.skip !== undefined;
}

function isDecorator(args: unknown[]): args is [object, string | symbol, PropertyDescriptor] {
    return args[0] instanceof Object;
}

function destructureArgs(args: unknown[]): [string | null, OptionalTestOptions] {
    if (args.length === 0) {
        return [null, {}];
    }

    if (args.length === 1) {
        const [first] = args;
        if (typeof first === 'string') {
            return [first, {}];
        }

        if (isOptions(first)) {
            return [null, first];
        }

        return [null, {}];
    }

    return [args[0] as string, args[1] as OptionalTestOptions];
}

/**
 * Specifies that a method is a test.
 * @param target Parent target of the method.
 * @param propertyKey Name of the target method in the parent context.
 * @param descriptor Descriptor that contains method information.
 */
export function test(name: string): TestDecorator;
export function test(options: TestOptions): TestDecorator;
export function test(name: string, options: TestOptions): TestDecorator;
export function test(target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void;
export function test(...args: unknown[]): void | TestDecorator {
    const [name, options] = destructureArgs(args);
    const decorator: TestDecorator = (target, propertyKey) => {
        return setTestMetadata(
            {
                name: name ?? propertyKey.toString(),
                function: propertyKey,
                options: { ...defaultOptions, ...options }
            },
            target,
            propertyKey
        );
    };
    if (isDecorator(args)) {
        return decorator(...args);
    }

    return decorator;
}
