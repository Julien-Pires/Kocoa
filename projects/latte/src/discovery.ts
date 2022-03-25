import {
    TestAnnotation, TestDataAnnotation, testDataSymbol, TestSuiteAnnotation, testSuiteSymbol,
    testSymbol
} from './annotations';
import { createTree, insertLeaf, insertNodes, Test, TestSuite, Tree } from './types';

/**
 * Checks if specified property is a test (has test metadata).
 * @param target Target parent of the property.
 * @param propertyKey Name of the property.
 * @returns Returns true if the property is a test otherwise false.
 */
const hasTest = (target: any, propertyKey: string | symbol): boolean => {
    return Reflect.getMetadata(testSymbol, target, propertyKey) !== undefined;
}

/**
 * Builds test data for the specified property.
 * @param target Target parent of the property.
 * @param propertyKey Name of the property.
 * @returns Returns a fully functional test for the specified property.
 */
const buildTest = (target: any, propertyKey: string | symbol): Test => {
    const testAnnotation: TestAnnotation = Reflect.getMetadata(testSymbol, target, propertyKey);
    const testDatas = Reflect.getAllMetadata<TestDataAnnotation>(testDataSymbol, target, propertyKey);
    const testCases = testDatas.map((data) => ({
        args: data.args,
        ... data.name ? { name: data.name } : {}
    }));

    return {
        name: testAnnotation.name,
        function: testAnnotation.function,
        cases: testCases.length > 0 ? testCases : [{ args: [] }]
    };
}
 
/**
 * Finds test suite for the specified class/property.
 * @param target Target to look test suite on. When property key is specified, it become the parent target of the property.
 * @param propertyKey Name of the property.
 * @returns Returns a collection of test suite.
 */
const findTestSuite = (target: any, propertyKey?: string | symbol): readonly TestSuite[] => {
    const testSuites = propertyKey ? 
        Reflect.getAllMetadata<TestSuiteAnnotation>(testSuiteSymbol, target, propertyKey) : 
        Reflect.getAllMetadata<TestSuiteAnnotation>(testSuiteSymbol, target);

    return testSuites
        .reverse()
        .map((category) => ({ name: category.name }
    ));
}

/**
 * Finds all tests on all property of the specified target.
 * @param target Target used to extract all tests.
 * @returns Returns a collection of test and associated test suite for each one.
 */
const findAllTests = (target: any): readonly [readonly TestSuite[], Test][] => {
    return Object.getOwnPropertyNames(target)
                 .filter((propertyKey) => hasTest(target, propertyKey))
                 .map((propertyKey) => [findTestSuite(target, propertyKey), buildTest(target, propertyKey)]);
}

/**
 * Creates an execution tree that contains all test suite and test for the specified target.
 * @param target Target used to build the tree.
 * @returns Returns a tree that represents all test suite and tests of the specified target.
 */
export const buildTests = (target: any): Tree<TestSuite, Test> => {
    const tree = createTree<TestSuite, Test>();
    const rootTestSuite = findTestSuite(target);
    insertNodes(tree, rootTestSuite.map((group) => ({ name: group.name, value: group })));

    const tests = findAllTests(target.prototype);
    for (const [groups, test] of tests) {
        const namedGroups = [...rootTestSuite, ...groups].map((group) => ({ name: group.name, value: group }));
        insertLeaf(tree, test, namedGroups);
    }

    return tree;
}
