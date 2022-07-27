import { expect } from 'chai';

import { suite, test } from '../index.js';
import { TestAnnotation } from '../src/annotations.js';
import { TestClassFixture } from './test.fixtures.js';

@suite('@test')
export class TestDecoratorTests {
    @test
    public 'should not have test annotation when method is not annoted'() {
        const actual = TestAnnotation.get(TestClassFixture, 'noTest');

        expect(actual).to.be.null;
    }

    @test
    public 'should have test annotation when method is annoted'() {
        const actual = TestAnnotation.get(TestClassFixture, 'runTest');

        expect(actual).to.not.be.null;
    }

    @test
    public 'should use method name as test name when custom name is not specified'() {
        const actual = TestAnnotation.get(TestClassFixture, 'runTest');

        expect(actual?.method).to.equal('runTest');
    }

    @test
    public 'should use custom test name when one is specified'() {
        const actual = TestAnnotation.get(TestClassFixture, 'runCustomTest');

        expect(actual?.name).to.equals('my custom test');
    }

    @test
    public 'should have skip option set to true when skip option is set to true'() {
        const actual = TestAnnotation.get(TestClassFixture, 'skippedTest');

        expect(actual?.options.skip).to.not.be.undefined;
        expect(actual?.options.skip).to.be.true;
    }

    @test
    public 'should have skip option set to false when skip option is not specified'() {
        const actual = TestAnnotation.get(TestClassFixture, 'runTest');

        expect(actual?.options.skip).to.be.false;
    }

    @test
    public 'should have skip option to false when skip option is set to false'() {
        const actual = TestAnnotation.get(TestClassFixture, 'notSkippedTest');

        expect(actual?.options.skip).to.be.false;
    }
}
