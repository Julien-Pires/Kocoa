import { SuiteAnnotation, SuiteOptions } from '../annotations.js';
import { setAnnotation } from '../core/index.js';
import { Constructor } from '../types/index.js';

/**
 * Represents possible targets for the test suite decorator
 */
type SuiteAttribute = {
    <T>(target: Constructor<T>): void;
    (target: object, propertyKey: string | symbol): void;
};

/**
 * Default values for test suite options
 */
const defaultOptions: SuiteOptions = {
    skip: false
};

/**
 * Allows to include class/method in the specified test suite
 * @param name Name of the test suite
 * @param options Represents additional settings for the test suite
 */
export function suite(name: string, options?: SuiteOptions): SuiteAttribute {
    return (<T>(target: Constructor<T>) => {
        return setAnnotation(SuiteAnnotation({ name, options: { ...defaultOptions, ...(options ?? {}) } }), target);
    }) as SuiteAttribute;
}
