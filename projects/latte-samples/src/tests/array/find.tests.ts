import { expect } from 'chai';
import { test, testData, category } from 'latte';

@category('Array')
export class FindTests {
    @test
    @testData([1, 2, 3], 1)
    @testData(['A', 'B', 'C'], 'A')
    public 'should return element when found in array'<T>(array: T[], element: T) {
        const actual = array.find((char) => char === element);

        expect(actual).to.not.be.undefined;
        expect(actual).to.equal(element);
    }

    @test
    @testData([1, 2, 3], 100)
    @testData(['A', 'B', 'C'], 'Z')
    public 'should return undefined when element is not found'<T>(array: T[], element: T) {
        const actual = array.find((char) => char === element);

        expect(actual).to.be.undefined;
    }
}
