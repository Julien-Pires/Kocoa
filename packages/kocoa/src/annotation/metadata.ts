import { SuiteAnnotation, TestAnnotation, TestDataAnnotation } from '../types';
import { createRunnerEventEmitter, RunnerEvent } from './events';

export const MetadataKeys = {
    test: Symbol('Test'),
    testData: Symbol('TestData'),
    suite: Symbol('Suite')
};

export const events = createRunnerEventEmitter();

export const setSuiteMetadata = (suite: SuiteAnnotation, target: object, propertyKey: string | symbol): void => {
    Reflect.appendMetadata(MetadataKeys.suite, suite, target, propertyKey);
    events.emit(RunnerEvent.SuiteAdded, { target });
};

export const setTestMetadata = (test: TestAnnotation, target: object, propertyKey: string | symbol): void => {
    Reflect.defineMetadata(MetadataKeys.test, test, target, propertyKey);
    events.emit(RunnerEvent.TestAdded, { target, propertyKey });
};

export const setTestDataMetadata = (
    testData: TestDataAnnotation,
    target: object,
    propertyKey: string | symbol
): void => {
    Reflect.appendMetadata<TestDataAnnotation>(MetadataKeys.testData, testData, target, propertyKey);
};

export const getSuiteMetadata = (target: object): SuiteAnnotation => {
    return Reflect.getMetadata(MetadataKeys.suite, target);
};

export const getTestMetadata = (target: object): TestAnnotation[] => {
    const propertyKeys = Object.getOwnPropertyNames(target);

    return propertyKeys.flatMap((propertyKey: string | symbol) =>
        Reflect.getMetadata(MetadataKeys.test, target, propertyKey)
    );
};

export const getTestDataMetadata = (target: object, propertyKey: string | symbol): TestDataAnnotation[] => {
    return Reflect.getAllMetadata(MetadataKeys.testData, target, propertyKey);
};
