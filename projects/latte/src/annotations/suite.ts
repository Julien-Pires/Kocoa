import { runTest } from '../runner.js';
import { suiteSymbol } from './metadata.js';
import * as Reflect from './reflect.js';
import { SuiteOptions } from './types.js';

/**
 * Represents possible targets for the test suite decorator
 */
type SuiteAttribute = {
    (target: { new (): unknown }): void;
    (target: object, propertyKey: string | symbol): void;
};

const defaultOptions: SuiteOptions = {
    skip: false
};

/**
 * Allows to include class/method in the specified test suite
 * @param name Name of the test suite
 * @param options Represents additional settings for the test suite
 */
export const suite = (name: string, options?: SuiteOptions): SuiteAttribute =>
    function (target: { new (): unknown }, propertyKey: string | symbol) {
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
