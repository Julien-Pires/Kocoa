import { runTest } from '../oldRunner.js';
import { suiteSymbol } from '../annotation/metadata.js';
import * as Reflect from '../annotation/reflect.js';
import { Constructor, SuiteOptions } from '../types/index.js';

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
export const suite = (name: string, options?: SuiteOptions): SuiteAttribute =>
    function <T>(target: Constructor<T>, propertyKey: string | symbol) {
        Reflect.appendMetadata(
            suiteSymbol,
            { name, options: { ...defaultOptions, ...(options ?? {}) } },
            target,
            propertyKey
        );
        if (propertyKey) {
            return;
        }

        runTest(target);
    } as SuiteAttribute;
