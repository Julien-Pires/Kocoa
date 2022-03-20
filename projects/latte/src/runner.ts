import { testCaseSymbol, testGroupSymbol } from "./annotations/metadata";
import { TestCase, TestGroup, TestTree } from "./types";

const buildTestCaseName = (testCase: TestCase): string => {
    const parameters = testCase.args.join(',');

    return `${testCase.name}(${parameters})`;
}

const buildTestCase = (testCase: TestCase): TestCase => {
    const name = testCase.name ?? buildTestCaseName(testCase);

    return { ...testCase, name };
}

const findTests = (target: any): TestCase[] => {
    return Object.getOwnPropertyNames(target.prototype)
                 .map((property): TestCase[] => Reflect.getMetadata(testCaseSymbol, target.prototype, property) ?? [])
                 .flatMap((testCases) => testCases?.map(buildTestCase));
}

const buildTestTree = (target: any): TestTree => {
    const root: TestGroup = Reflect.getMetadata(testGroupSymbol, target);
    const tree = {
        target,
        root: {
            name: root?.name,
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
