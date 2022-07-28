import { expect } from 'chai';

import { suite, test, testData } from '../index.js';
import { SuiteAnnotation } from '../src/annotations.js';
import { SingleSuiteFixture, SkipOptionsFixtures } from './suite.fixtures.js';

@suite('@suite')
export class TestSuiteClassDecoratorTests {
    @test
    public 'should contains test suite annotation when class is annoted'() {
        const actual = SuiteAnnotation.get(SingleSuiteFixture);

        expect(actual).to.not.be.null;
    }

    @test
    public 'should have specified name for test suite annotation on class'() {
        const actual = SuiteAnnotation.get(SingleSuiteFixture);

        expect(actual.name).to.equals('testSuite');
    }

    @test
    public 'should have skip option set to true when skip options is set to true'() {
        const actual = SuiteAnnotation.get(SkipOptionsFixtures);

        expect(actual?.options.skip).to.be.true;
    }

    @test
    @testData(SingleSuiteFixture)
    public 'should have skip option set to false when skip options is not specified'() {
        const actual = SuiteAnnotation.get(SingleSuiteFixture);

        expect(actual?.options.skip).to.be.false;
    }
}
