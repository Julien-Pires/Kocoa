import { Annotation, AnnotationUsage, createAnnotation } from './core/index.js';

/**
 * Represents a set of options for a test
 */
export interface TestOptions {
    skip: boolean;
}

/**
 * Represents a set of options for a test suite
 */
export interface SuiteOptions {
    skip: boolean;
}

/**
 * Represents a set of options for test data
 */
export interface TestDataOptions {
    expected?: unknown;
}

/**
 * Provides information about a test method
 */
const TestAnnotationDefinition = {
    key: 'TestAnnotation',
    usage: AnnotationUsage.Method,
    allowMultiple: false
} as const;
export interface TestAnnotationAttribute extends Annotation<typeof TestAnnotationDefinition> {
    readonly name: string;
    readonly method: string | symbol;
    readonly options: TestOptions;
}
export const TestAnnotation = createAnnotation<TestAnnotationAttribute>(TestAnnotationDefinition);

/**
 * Provides a data source for a test
 */
const TestDataAnnotationDefinition = {
    key: 'TestDataAnnotation',
    usage: AnnotationUsage.Method,
    allowMultiple: true
} as const;
export interface TestDataAnnotationAttribute extends Annotation<typeof TestDataAnnotationDefinition> {
    readonly args: () => Iterable<readonly unknown[]>;
    readonly options: TestDataOptions;
}
export const TestDataAnnotation = createAnnotation<TestDataAnnotationAttribute>(TestDataAnnotationDefinition);

/**
 * Provides information about a test suite
 */
const SuiteAnnotationDefinition = {
    key: 'SuiteAnnotation',
    usage: AnnotationUsage.Class,
    allowMultiple: false
} as const;
export interface SuiteAnnotationAttribute extends Annotation<typeof SuiteAnnotationDefinition> {
    readonly name: string;
    readonly options: SuiteOptions;
}
export const SuiteAnnotation = createAnnotation<SuiteAnnotationAttribute>(SuiteAnnotationDefinition);
