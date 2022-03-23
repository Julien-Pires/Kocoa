import {
    TestAnnotation, TestDataAnnotation, testDataSymbol, TestSuiteAnnotation, testSuiteSymbol,
    testSymbol
} from './annotations';
import { createTree, insertLeaf, insertNodes, Test, TestSuite, Tree } from './types';

const hasTest = (target: any, propertyKey: string | symbol): boolean => {
    return Reflect.getMetadata(testSymbol, target, propertyKey) !== undefined;
}

const findTest = (target: any, propertyKey: string | symbol): Test => {
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
 
const findTestSuite = (target: any, propertyKey?: string | symbol): readonly TestSuite[] => {
    const testSuites = propertyKey ? 
        Reflect.getAllMetadata<TestSuiteAnnotation>(testSuiteSymbol, target, propertyKey) : 
        Reflect.getAllMetadata<TestSuiteAnnotation>(testSuiteSymbol, target);
    if (testSuites.length === 0) {
        return [];
    }

    return testSuites
        .reverse()
        .map((category) => ({ name: category.name }
    ));
}

const findAllTests = (target: any): [readonly TestSuite[], Test][] => {
    return Object.getOwnPropertyNames(target)
                 .filter((propertyKey) => hasTest(target, propertyKey))
                 .map((propertyKey) => [findTestSuite(target, propertyKey), findTest(target, propertyKey)]);
}

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
