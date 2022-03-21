import { expect } from 'chai';
import { testCase, category } from 'latte';

@category('Array')
export class FindTests {
    @category('Find')
    @testCase([1, 2, 3], 1)
    @testCase(['A', 'B', 'C'], 'A')
    public 'should return element when found in array'<T>(array: T[], element: T) {
        expect(array.find((char) => char === element)).to.equal(element);
    }

    @category('Find')
    @testCase([1, 2, 3], 100)
    @testCase(['A', 'B', 'C'], 'Z')
    public 'should return undefined when element is not found'<T>(array: T[], element: T) {
        expect(array.find((char) => char === element)).to.equal(undefined);
    }
}
