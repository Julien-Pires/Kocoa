import 'mocha';

import { buildTests } from './discovery';
import { Node, Test, TestCase, TestSuite } from './types';

/**
 * Checks if specified value is a Test instance.
 * @param value Value to check against.
 * @returns Return true if the value is a Test instance otherwise false.
 */
const isTest = (value: any): value is Test => {
    return (value as Test).function !== undefined;
};

/**
 * Creates test case title from specified test and test case metadata
 * @param testName Default name of the test method.
 * @param testCase Test case instance for which title is created.
 * @returns Returns a test case title.
 */
const buildTestCaseTitle = (testName: string, testCase: TestCase): string => {
    if (testCase.name) {
        return testCase.name;
    }

    if (testCase.args.length === 0) {
        return testName;
    }

    const parameters = testCase.args.map((arg) => JSON.stringify(arg)).join(', ');

    return `${testName} (${parameters})`;
};

/**
 * Adds a test to the current test execution context.
 * @param target Parent target of the test.
 * @param test Test to run.
 */
const addTest = (target: any, test: Test): void => {
    for (const testCase of test.cases) {
        const title = buildTestCaseTitle(test.name, testCase);
        it(title, () => {
            const instance = Object.create(target);
            test.function.apply(instance, testCase.args);
        });
    }
};

/**
 * Adds a test suite to the current test execution context.
 * @param target Parent target of the test.
 * @param node Childrens of the current test suite.
 */
const addTestSuite = (target: any, node: Node<TestSuite, Test>): void => {
    const testSuite = node.value;
    if (!testSuite) {
        return;
    }

    describe(testSuite?.name, () => {
        visit(target, node);
    });
};

/**
 * Visits the specified test node.
 * @param target Parent target of the test node.
 * @param node Current test node to visit.
 */
const visit = (target: any, node: Node<TestSuite, Test>): void => {
    for (const children of node.childrens) {
        const value = children.value;
        if (isTest(value)) {
            addTest(target, value);
            continue;
        }

        addTestSuite(target, children as Node<TestSuite, Test>);
    }
};

/**
 * Run all tests for the specified target
 * @param target Target used to run all tests.
 */
export const runTest = (target: any): void => {
    const tree = buildTests(target);
    visit(target.prototype, tree);
};
