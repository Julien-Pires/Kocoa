import { setTestMetadata } from '../annotations/metadata.js';
import { TestOptions as AnnotationOptions } from './../types/index.js';

export interface TestOptions {
    name?: string;
    skip?: boolean;
}

type TestDecorator = (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;

/**
 * Represents all possible signatures for the test decorator
 */
type TestAttribute = {
    (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void;
    (options: TestOptions): TestDecorator;
    (name: string, options: TestOptions): TestDecorator;
};

/**
 * Default values for test options
 */
const defaultOptions: AnnotationOptions = {
    skip: false
};

/**
 * Specifies that a method is a test.
 * @param target Parent target of the method.
 * @param propertyKey Name of the target method in the parent context.
 * @param descriptor Descriptor that contains method information.
 */
export const test: TestAttribute = ((
    arg1: object | string | TestOptions,
    arg2: (string | symbol) | TestOptions,
    descriptor: PropertyDescriptor
) => {
    const options = descriptor ? { ...defaultOptions } : { ...defaultOptions, ...(arg1 as TestOptions) };
    const decorator: TestDecorator = (target, propertyKey) => {
        return setTestMetadata(
            {
                name: options.name ?? propertyKey.toString(),
                function: propertyKey,
                options
            },
            target,
            propertyKey
        );
    };
    if (descriptor) {
        return decorator(arg1 as object, arg2 as string | symbol, descriptor);
    }

    return decorator;
}) as TestAttribute;
