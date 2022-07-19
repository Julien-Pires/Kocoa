import chai from 'chai';
import chaiSubset from 'chai-subset';

import { suite, test, testData } from '../index.js';
import { SuiteAnnotation } from '../src/annotations.js';
import { getAnnotation } from './metadata/index.js';
import { SingleSuiteFixture, SkipOptionsFixtures } from './suite.fixtures.js';

const { expect } = chai;

chai.use(chaiSubset);

@suite('@suite')
export class TestSuiteClassDecoratorTests {
    @test
    public 'should contains test suite annotation when class is annoted'() {
        const actual = getAnnotation(SuiteAnnotation, SingleSuiteFixture);

        expect(actual).to.not.be.null;
    }

    @test
    @testData(SingleSuiteFixture, { name: 'testSuite' })
    public 'should have specified name for test suite annotation on class'(
        prototype: object,
        expected: { name: string }
    ) {
        const actual = getAnnotation(SuiteAnnotation, prototype);
        expect(actual).to.containSubset(expected);
    }

    @test
    public 'should have skip option set to true when skip options is set to true'() {
        const actual = getAnnotation(SuiteAnnotation, SkipOptionsFixtures);

        expect(actual?.options.skip).to.be.true;
    }

    @test
    @testData(SingleSuiteFixture)
    public 'should have skip option set to false when skip options is not specified'() {
        const actual = getAnnotation(SuiteAnnotation, SingleSuiteFixture);

        expect(actual?.options.skip).to.be.false;
    }
}
