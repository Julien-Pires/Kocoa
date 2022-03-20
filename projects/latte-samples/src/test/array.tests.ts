import 'reflect-metadata';

import { expect } from 'chai';
import { testCase, testGroup } from 'latte';

@testGroup('Array indexOf')
export class IndexOfTests {
    @testCase()
    public 'should return index when element is found'() {
        const actual = ['A', 'B', 'C'];
        expect(actual.indexOf('B')).to.equal(1);
    }

    @testCase()
    public 'should return -1 when element is not found'() {
        const actual = ['A', 'B', 'C']
        expect(actual.indexOf('Z')).to.equal(-1);
    }
}

@testGroup('Array find')
export class FindTests {
    @testCase()
    public 'should return element when found in array'() {
        const actual = ['A', 'B', 'C'];
        expect(actual.find((char) => char === 'A')).to.equal('A');
    }

    @testCase()
    public 'should return undefined when element is not found'() {
        const actual = ['A', 'B', 'C']
        expect(actual.find((char) => char === 'Z')).to.equal(undefined);
    }
}
