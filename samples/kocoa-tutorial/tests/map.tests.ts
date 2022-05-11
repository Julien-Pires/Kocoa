import { expect } from 'chai';
import { test, testData, suite } from 'kocoa';

@suite('Map')
export class MapTests {
    @test
    public 'should return undefined when empty'() {
        const sut = new Map([]);
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

    @test({ skip: true })
    public 'should return undefined when key does not exists'() {
        const sut = new Map([]);
        const actual = sut.get('foo');

        expect(actual).to.be.undefined;
    }
}

@suite('Dictionary', { skip: true })
export class DictionaryTests {
    @test
    public 'should return undefined when key does not exists'() {
        const sut = {};
        const actual = sut['foo'];

        expect(actual).to.be.undefined;
    }

    @test
    @testData({ foo: 1 }, 'foo', 1)
    public 'should return item when key exists'<TKey extends string, TValue>(
        sut: Record<TKey, TValue>,
        key: TKey,
        value: TValue
    ) {
        const actual = sut[key];

        expect(actual).to.not.be.undefined;
        expect(actual).to.equal(value);
    }
}
