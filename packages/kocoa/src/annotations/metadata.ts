import { SuiteAnnotation, TestAnnotation, TestDataAnnotation } from '../types/index.js';
import { createRunnerEventEmitter, RunnerEvent } from './events.js';

export const MetadataKeys = {
    test: Symbol('Test'),
    testData: Symbol('TestData'),
    suite: Symbol('Suite')
};

export const events = createRunnerEventEmitter();

export function setSuiteMetadata(suite: SuiteAnnotation, target: object, propertyKey: string | symbol): void {
    Reflect.appendMetadata(MetadataKeys.suite, suite, target, propertyKey);
    events.emit(RunnerEvent.SuiteAdded, { target });
}

export function setTestMetadata(test: TestAnnotation, target: object, propertyKey: string | symbol): void {
    Reflect.defineMetadata(MetadataKeys.test, test, target, propertyKey);
    events.emit(RunnerEvent.TestAdded, { target, propertyKey });
}

export function setTestDataMetadata(testData: TestDataAnnotation, target: object, propertyKey: string | symbol): void {
    Reflect.appendMetadata<TestDataAnnotation>(MetadataKeys.testData, testData, target, propertyKey);
}

export function getSuiteMetadata(target: object): SuiteAnnotation {
    return Reflect.getMetadata(MetadataKeys.suite, target);
}

export function getTestMetadata(target: object): TestAnnotation[];
export function getTestMetadata(target: object, propertyKey: string | symbol): TestAnnotation;
export function getTestMetadata(target: object, propertyKey?: string | symbol): TestAnnotation[] | TestAnnotation {
    if (propertyKey) {
        return Reflect.getMetadata(MetadataKeys.test, target, propertyKey);
    }

    const propertyKeys = Object.getOwnPropertyNames(target);

    return propertyKeys.flatMap((key: string | symbol) => Reflect.getMetadata(MetadataKeys.test, target, key));
}

export function getTestDataMetadata(target: object, propertyKey: string | symbol): TestDataAnnotation[] {
    return Reflect.getAllMetadata(MetadataKeys.testData, target, propertyKey);
}
