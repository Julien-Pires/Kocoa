import { testSymbol } from './metadata';

/**
 * Specifies that a method is a test.
 * @param target Parent target of the method.
 * @param propertyKey Name of the target method in the parent context.
 * @param descriptor Descriptor that contains method information.
 */
export const test = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(
        testSymbol,
        {
            name: propertyKey,
            function: descriptor.value
        },
        target,
        propertyKey
    );
};
