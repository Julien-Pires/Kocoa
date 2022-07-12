import { TestAnnotation } from '../annotations.js';
import { setAnnotation } from '../core/index.js';
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

function isRawDecorator(args: unknown[]): args is [object, string | symbol, PropertyDescriptor] {
    if (args.length <= 2) {
        return false;
    }

    return args[2] !== undefined;
}

function destructureArgs(args: unknown[]): [string | null, OptionalTestOptions] {
    if (args.length === 0 || args.length >= 3) {
        return [null, {}];
    }

    const [first, second] = args;
    if (second) {
        if (second instanceof String) {
            return [null, {}];
        }

        return [first as string, second as OptionalTestOptions];
    }

    return typeof first === 'string' ? [first, {}] : [null, first as OptionalTestOptions];
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
        return setAnnotation(
            TestAnnotation({
                name: name ?? propertyKey.toString(),
                method: propertyKey,
                options: { ...defaultOptions, ...options }
            }),
            target,
            propertyKey
        );
    };
    if (isRawDecorator(args)) {
        return decorator(...args);
    }

    return decorator;
}
