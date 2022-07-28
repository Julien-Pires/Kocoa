import { AnnotationAttribute, AnnotationUsage, create } from './metadata/index.js';

/**
 * Provides information about a test method
 */
const TestAnnotationDefinition = {
    key: 'TestAnnotation',
    usage: AnnotationUsage.Method,
    allowMultiple: false
} as const;
export const TestAnnotation = create<
    {
        readonly name: string;
        readonly method: string | symbol;
        readonly options: {
            skip: boolean;
        };
    },
    typeof TestAnnotationDefinition
>(TestAnnotationDefinition);
export type TestAnnotation = AnnotationAttribute<typeof TestAnnotation>;

/**
 * Provides a data source for a test
 */
const TestDataAnnotationDefinition = {
    key: 'TestDataAnnotation',
    usage: AnnotationUsage.Method,
    allowMultiple: true
} as const;
export const TestDataAnnotation = create<
    {
        readonly args: () => Iterable<readonly unknown[]>;
        readonly options: {
            expected?: unknown;
        };
    },
    typeof TestDataAnnotationDefinition
>(TestDataAnnotationDefinition);
export type TestDataAnnotation = AnnotationAttribute<typeof TestDataAnnotation>;

/**
 * Provides information about a test suite
 */
const SuiteAnnotationDefinition = {
    key: 'SuiteAnnotation',
    usage: AnnotationUsage.Class,
    allowMultiple: false
} as const;
export const SuiteAnnotation = create<
    {
        readonly name: string;
        readonly options: {
            skip: boolean;
        };
    },
    typeof SuiteAnnotationDefinition
>(SuiteAnnotationDefinition);
export type SuiteAnnotation = AnnotationAttribute<typeof SuiteAnnotation>;
