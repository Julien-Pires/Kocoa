import { expect } from 'chai';
import { test, testData, testSuite } from 'latte/src';

@testSuite('Array')
export class ArrayTests {
    @test
    @testSuite('Find')
    public 'should return undefined when array is empty'() {
        const actual = [].find((item) => item === {});

        expect(actual).to.be.undefined;
    }

    @test
    @testSuite('Find')
    @testData([1, 2, 3], 1)
    @testData(['A', 'B', 'C'], 'A')
    public 'should return element when found in array'<T>(array: T[], element: T) {
        const actual = array.find((item) => item === element);

        expect(actual).to.not.be.undefined;
        expect(actual).to.equal(element);
    }

    @test
    @testSuite('Find')
    @testData([1, 2, 3], 100)
    @testData(['A', 'B', 'C'], 'Z')
    public 'should return undefined when element is not found'<T>(array: T[], element: T) {
        const actual = array.find((item) => item === element);

        expect(actual).to.be.undefined;
    }

    @test
    @testSuite('IndexOf')
    @testData(['A'], 'A')
    @testData(['A', 'B', 'C'], 'A')
    public 'should return index when element is found'(array: string[], element: string) {
        expect(array.indexOf(element)).to.equal(0);
    }

    @test
    @testSuite('IndexOf')
    @testData([], 'A')
    @testData(['A', 'B', 'C'], 'Z')
    public 'should return -1 when element is not found'(array: string[], element: string) {
        expect(array.indexOf(element)).to.equal(-1);
    }
}
