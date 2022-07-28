import { TestAnnotation } from '../annotations.js';

interface TestOptions {
    skip?: boolean;
}

type TestDecorator = (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;

/**
 * Default values for test options
 */
const defaultOptions = {
    skip: false
};

function isTestOptions(value: unknown): value is TestOptions {
    return (value as TestOptions)?.skip !== undefined;
}

function getTestOptions(...args: unknown[]): [string | null, TestOptions] {
    if (args.length > 2) {
        throw new Error('Invalid test arguments count');
    }

    if (isTestOptions(args[0])) {
        return [null, args[0]];
    }

    if (isTestOptions(args[1])) {
        return [args[0] as string | null, args[1]];
    }

    return [args[0] as string | null, {}];
}

function isRawDecorator(args: unknown[]): args is [object, string | symbol, PropertyDescriptor] {
    if (args.length !== 3) {
        return false;
    }

    return typeof args[1] === 'string' || typeof args[1] === 'symbol';
}

export function test(name: string): TestDecorator;
export function test(options: TestOptions): TestDecorator;
export function test(name: string, options: TestOptions): TestDecorator;
export function test(target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void;
export function test(...args: unknown[]): void | TestDecorator {
    if (isRawDecorator(args)) {
        const [, propertyKey] = args;
        return TestAnnotation({
            name: String(propertyKey),
            method: String(propertyKey),
            options: defaultOptions
        })(...args);
    }

    const [name, options] = getTestOptions(...args);
    return TestAnnotation((_target, propertyKey) => {
        return {
            name: name ?? propertyKey.toString(),
            method: propertyKey,
            options: { ...defaultOptions, ...options }
        };
    });
}
