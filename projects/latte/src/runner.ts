import { buildTests } from './discovery';
import { Node, Test, TestGroup } from './types';

const isTest = (value: any): value is Test => {
    return (value as Test).function !== undefined;
}

const executeTest = (target: any, test: Test) => {
    for (const one of test.cases) {
        it (one.name, () => {
            const instance = Object.create(target);
            test.function.apply(instance, one.args);
        });
    }
}

const executeDescribe = (target: any, node: Node<TestGroup, Test>) => {
    const testGroup = node.value;
    if (!testGroup) {
        return;
    }

    describe(testGroup?.name, () => {
        visit(target, node);
    })
}

const visit = (target: any, node: Node<TestGroup, Test>) => {
    for (const children of node.childrens) {
        const value = children.value;
        if (isTest(value)) {
            executeTest(target, value);
            continue;
        }

        executeDescribe(target, children as Node<TestGroup, Test>);
    }
}

export const runTest = (target: any) => {
    const tree = buildTests(target);
    visit(target.prototype, tree);
}
