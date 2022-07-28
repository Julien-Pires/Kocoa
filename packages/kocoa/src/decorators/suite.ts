import { Constructor } from '@kocoa/core';

import { SuiteAnnotation } from '../annotations.js';

interface SuiteOptions {
    skip?: boolean;
}

/**
 * Default values for test suite options
 */
const defaultOptions = {
    skip: false
};

/**
 * Allows to include class/method in the specified test suite
 * @param name Name of the test suite
 * @param options Represents additional settings for the test suite
 */
export function suite(name: string, options?: SuiteOptions) {
    return SuiteAnnotation<Constructor<unknown>>({
        name,
        options: { ...defaultOptions, ...options }
    });
}
