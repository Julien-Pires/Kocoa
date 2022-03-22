import { expect } from 'chai';
import { category, test, testData } from 'latte';

@category('Array')
export class IndexOfTests {
    @test
    @testData(['A'], 'A')
    @testData(['A', 'B', 'C'], 'A')
    public 'should return index when element is found'(array: string[], element: string) {
        expect(array.indexOf(element)).to.equal(0);
    }

    @test
    @testData([], 'A')
    @testData(['A', 'B', 'C'], 'Z')
    public 'should return -1 when element is not found'(array: string[], element: string) {
        expect(array.indexOf(element)).to.equal(-1);
    }
}