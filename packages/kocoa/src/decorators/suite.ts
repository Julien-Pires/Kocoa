import { Constructor } from '@kocoa/core';

import { SuiteAnnotation, SuiteOptions } from '../annotations.js';

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
export function suite(name: string, options?: SuiteOptions) {
    return SuiteAnnotation<Constructor<unknown>>(() => {
        return { name, options: { ...defaultOptions, ...(options ?? {}) } };
    });
}
