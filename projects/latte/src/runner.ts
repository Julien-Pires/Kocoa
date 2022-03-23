import { buildTests } from './discovery';
import { Node, Test, TestCase, TestSuite } from './types';

const isTest = (value: any): value is Test => {
    return (value as Test).function !== undefined;
}

const buildTestCaseTitle = (testName: string, testCase: TestCase): string => {
    if (testCase.name) {
        return testCase.name;
    }

    if (testCase.args.length === 0) {
        return testName;
    }

    const parameters = testCase.args.map((arg) => JSON.stringify(arg)).join(', ');

    return `${testName} (${parameters})`;
}

const addTest = (target: any, test: Test): void => {
    for (const testCase of test.cases) {
        const title = buildTestCaseTitle(test.name, testCase);
        it (title, () => {
            const instance = Object.create(target);
            test.function.apply(instance, testCase.args);
        });
    }
}

const addTestSuite = (target: any, node: Node<TestSuite, Test>) => {
    const testSuite = node.value;
    if (!testSuite) {
        return;
    }

    describe(testSuite?.name, () => {
        visit(target, node);
    });
}

const visit = (target: any, node: Node<TestSuite, Test>) => {
    for (const children of node.childrens) {
        const value = children.value;
        if (isTest(value)) {
            addTest(target, value);
            continue;
        }

        addTestSuite(target, children as Node<TestSuite, Test>);
    }
}

export const runTest = (target: any) => {
    const tree = buildTests(target);
    visit(target.prototype, tree);
}
