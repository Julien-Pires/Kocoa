import { expect } from 'chai';
import { testCase, testGroup } from 'latte';

@testGroup('Array indexOf')
export class IndexOfTests {
    @testCase(['A'], 'A')
    @testCase(['A', 'B', 'C'], 'A')
    public 'should return index when element is found'(array: string[], element: string) {
        expect(array.indexOf(element)).to.equal(0);
    }

    @testCase([], 'A')
    @testCase(['A', 'B', 'C'], 'Z')
    public 'should return -1 when element is not found'(array: string[], element: string) {
        expect(array.indexOf(element)).to.equal(-1);
    }
}
