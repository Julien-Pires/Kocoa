import { runTest } from '../runner';
import { testSuiteSymbol } from './metadata';

/**
 * Represents possible targets for the test suite decorator
 */
type TestSuiteFunction = {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
}

/**
 * Allows to include class/method in the specified test suite
 * @param name Name of the test suite
 */
export const testSuite = (name: string): TestSuiteFunction => {
    return function(target: any, propertyKey: string | symbol) {
        Reflect.appendMetadata(testSuiteSymbol, { name }, target, propertyKey);
        if (propertyKey) {
            return;
        }

        runTest(target);
    } as TestSuiteFunction;
};
