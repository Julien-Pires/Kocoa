import {
    TestCaseAnnotation, testCaseSymbol, CategoryAnnotation, categorySymbol
} from './annotations';
import { TestCase, TestTree } from './types';

const buildTestCaseName = (testCase: TestCaseAnnotation): string => {
    const parameters = testCase.args.map((arg) => JSON.stringify(arg)).join(', ');

    return `${testCase.name.name} (${parameters})`;
}

const buildTestCase = (testCase: TestCaseAnnotation): TestCase => {
    const name = testCase.name.kind === 'custom' ? testCase.name.name : buildTestCaseName(testCase);

    return { ...testCase, name };
}

const findTests = (target: any): TestCase[] => {
    return Object.getOwnPropertyNames(target.prototype)
                 .map((property): TestCaseAnnotation[] => Reflect.getMetadata(testCaseSymbol, target.prototype, property) ?? [])
                 .flatMap((testCases) => testCases?.map(buildTestCase));
}

const buildTestTree = (target: any): TestTree => {
    const root: CategoryAnnotation = Reflect.getMetadata(categorySymbol, target);
    const tree = {
        target,
        root: {
            name: root.name,
            children: findTests(target)
        }
    };

    return tree;
}

export const runTest = (target: any) => {
    const tree = buildTestTree(target);
    describe(tree.root.name ?? '', () => {
        tree.root.children.forEach((testCase: TestCase) => {
            it(testCase.name, () => {
                const instance = Object.create(target.prototype);
                testCase.function.apply(instance, testCase.args);
            });
        })
    });
}
