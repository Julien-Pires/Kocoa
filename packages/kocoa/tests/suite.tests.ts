import chai from 'chai';
import chaiSubset from 'chai-subset';

import { suite, test, testData } from '../index.js';
import * as Annotation from './annotations/index.js';
import { MultipleSuiteFixture, SingleSuiteFixture, SkipOptionsFixtures } from './suite.fixtures.js';

const { expect } = chai;

chai.use(chaiSubset);

@suite('@suite')
export class TestSuiteClassDecoratorTests {
    @test
    @testData(SingleSuiteFixture, 1)
    @testData(MultipleSuiteFixture, 3)
    public 'should contains test suite annotation when class is annoted'(prototype: object, expected: number) {
        const actual = Annotation.getSuiteMetadata(prototype);

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(expected);
    }

    @test
    @testData(SingleSuiteFixture, [{ name: 'testSuite' }])
    @testData(MultipleSuiteFixture, [{ name: 'testSuite' }, { name: 'sample' }, { name: 'class' }])
    public 'should have specified name for test suite annotation on class'(
        prototype: object,
        expected: { name: string }[]
    ) {
        const actual = Annotation.getSuiteMetadata(prototype);

        expect(actual).to.containSubset(expected);
    }

    @test
    public 'should have skip option set to true when skip options is set to true'() {
        const actual = Annotation.getSuiteMetadata(SkipOptionsFixtures);

        expect(actual.options.skip).to.be.true;
    }

    @test
    @testData(SingleSuiteFixture)
    public 'should have skip option set to false when skip options is not specified'() {
        const actual = Annotation.getSuiteMetadata(SingleSuiteFixture);

        expect(actual.options.skip).to.be.false;
    }
}
