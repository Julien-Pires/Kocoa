import {
    CategoryAnnotation, categorySymbol, TestAnnotation, TestDataAnnotation, testDataSymbol,
    testSymbol
} from './annotations';
import { createTree, insertLeaf, insertNodes, Test, TestGroup, Tree } from './types';

const isTest = (value: any): value is Test => {
    return (value as Test).function !== undefined;
}

const hasTest = (target: any, propertyKey: string | symbol): boolean => {
    return Reflect.getMetadata(testSymbol, target, propertyKey) !== undefined;
}

const buildTestCaseName = (name: string, data: TestDataAnnotation): string => {
    const parameters = data.args.map((arg) => JSON.stringify(arg)).join(', ');

    return `${name} (${parameters})`;
}

const findTest = (target: any, propertyKey: string | symbol): Test => {
    const testAnnotation: TestAnnotation = Reflect.getMetadata(testSymbol, target, propertyKey);
    const data = Reflect.getAllMetadata<TestDataAnnotation>(testDataSymbol, target, propertyKey);
    const testCases = data.map((data) => ({
        name: data.name ?? buildTestCaseName(testAnnotation.name, data),
        args: data.args
    }));

    return {
        function: testAnnotation.function,
        cases: testCases.length > 0 ? testCases : [{ name: testAnnotation.name, args: [] }]
    };
}
 
const findTestGroup = (target: any, propertyKey?: string | symbol): readonly TestGroup[] => {
    const categories = propertyKey ? 
        Reflect.getAllMetadata<CategoryAnnotation>(categorySymbol, target, propertyKey) : 
        Reflect.getAllMetadata<CategoryAnnotation>(categorySymbol, target);
    if (categories.length === 0) {
        return [];
    }

    return categories
        .reverse()
        .map((category) => ({ name: category.name }
    ));
}

const findAllTests = (target: any): [readonly TestGroup[], Test][] => {
    return Object.getOwnPropertyNames(target)
                 .filter((propertyKey) => hasTest(target, propertyKey))
                 .map((propertyKey) => [findTestGroup(target, propertyKey), findTest(target, propertyKey)]);
}

export const buildTests = (target: any): Tree<TestGroup, Test> => {
    const tree = createTree<TestGroup, Test>();
    const rootGroups = findTestGroup(target);
    insertNodes(tree, rootGroups.map((group) => ({ name: group.name, value: group })));

    const tests = findAllTests(target.prototype);
    for (const [groups, test] of tests) {
        const namedGroups = [...rootGroups, ...groups].map((group) => ({ name: group.name, value: group }));
        insertLeaf(tree, test, namedGroups);
    }

    return tree;
}
