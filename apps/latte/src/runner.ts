import 'mocha';
import { Constructor } from './annotations/types.js';

import { buildTests } from './discovery.js';
import { Node, Test, TestCase, TestSuite } from './types/index.js';

/**
 * Checks if specified value is a Test instance.
 * @param value Value to check against.
 * @returns Return true if the value is a Test instance otherwise false.
 */
const isTest = (value: unknown): value is Test => (value as Test).cases !== undefined;

/**
 * Creates test case title from specified test and test case metadata
 * @param testName Default name of the test method.
 * @param testCase Test case instance for which title is created.
 * @returns Returns a test case title.
 */
const buildTestCaseTitle = (testName: string, testCase: TestCase): string => {
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
const addTest = (target: object, test: Test): void => {
    for (const testCase of test.cases) {
        const title = buildTestCaseTitle(test.name, testCase);
        const testRunner = test.skip ? it.skip : it;
        testRunner(title, () => {
            const instance = Object.create(target);
            instance[test.function](...testCase.args);
        });
    }
};

/**
 * Adds a test suite to the current test execution context.
 * @param target Parent target of the test.
 * @param node Childrens of the current test suite.
 */
const addTestSuite = (target: object, node: Node<TestSuite, Test>): void => {
    const testSuite = node.value;
    if (!testSuite) {
        return;
    }

    const suiteRunner = testSuite.skip ? describe.skip : describe;
    suiteRunner(testSuite?.name, () => {
        visit(target, node);
    });
};

/**
 * Visits the specified test node.
 * @param target Parent target of the test node.
 * @param node Current test node to visit.
 */
const visit = (target: object, node: Node<TestSuite, Test>): void => {
    for (const children of node.childrens) {
        const { value } = children;
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
export const runTest = <T>(target: Constructor<T>): void => {
    const tree = buildTests(target);
    visit(target.prototype, tree);
};
