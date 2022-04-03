import { expect } from 'chai';
import { test, testData, testSuite } from 'latte';

@testSuite('Map')
export class MapTests {
    @test
    public 'should return undefined when empty'() {
        const sut = new Map();
        const actual = sut.get({});

        expect(actual).to.be.undefined;
    }

    @test
    @testData(new Map([['foo', 1]]), 'foo', 1)
    public 'should return item when key exists'<TKey, TValue>(sut: Map<TKey, TValue>, key: TKey, value: TValue) {
        const actual = sut.get(key);

        expect(actual).to.not.be.undefined;
        expect(actual).to.equal(value);
    }
}
