import { runTest } from '../runner';
import { testSuiteSymbol } from './metadata';

export const testSuite = (name: string): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
} => {
    return function(target: any, propertyKey: string | symbol) {
        Reflect.appendMetadata(testSuiteSymbol, { name }, target, propertyKey);
        if (propertyKey) {
            return;
        }

        runTest(target);
    } as any;
};
