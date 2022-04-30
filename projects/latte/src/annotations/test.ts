import { testSymbol } from './metadata.js';
import { TestOptions } from './types.js';

/**
 * Represents all possible signatures for the test decorator
 */
type TestAttribute = {
    (options: TestOptions): (target: object, propertyKey: string | symbol) => void;
    (target: object, propertyKey: string | symbol): void;
};

const defaultOptions: TestOptions = {
    skip: false
};

/**
 * Set test metadata on the specified property for the given target
 * @param options Represents options to be associated with the current test
 * @returns Returns a decorator function that set test metadata
 */
const setTestAnnotation =
    (options: TestOptions) =>
    (target: object, propertyKey: string): void => {
        Reflect.defineMetadata(
            testSymbol,
            {
                name: propertyKey,
                options: { ...defaultOptions, ...options }
            },
            target,
            propertyKey
        );
    };

/**
 * Specifies that a method is a test.
 * @param target Parent target of the method.
 * @param propertyKey Name of the target method in the parent context.
 * @param descriptor Descriptor that contains method information.
 */
export const test: TestAttribute = ((target: object, propertyKey: string, descriptor: PropertyDescriptor) => {
    if (descriptor) {
        return setTestAnnotation({})(target, propertyKey);
    }

    return setTestAnnotation(target as TestOptions);
}) as TestAttribute;
