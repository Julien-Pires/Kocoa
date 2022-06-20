import { expect } from 'chai';

import { suite, test } from '../index.js';
import { testSymbol } from './annotation/metadata.js';
import { TestClassFixture } from './test.fixtures.js';
import { TestAnnotation } from './types';

@suite('@test')
export class TestDecoratorTests {
    @test
    public 'should not have test annotation when method is not annoted'() {
        const actual: TestAnnotation = Reflect.getMetadata(
            testSymbol,
            TestClassFixture.prototype,
            TestClassFixture.prototype.noTest.name
        );

        expect(actual).to.be.undefined;
    }

    @test
    public 'should have test annotation when method is annoted'() {
        const actual: TestAnnotation = Reflect.getMetadata(
            testSymbol,
            TestClassFixture.prototype,
            TestClassFixture.prototype.runTest.name
        );

        expect(actual).to.not.be.undefined;
    }

    @test
    public 'should use method name as test name when custom name is not specified'() {
        const actual: TestAnnotation = Reflect.getMetadata(
            testSymbol,
            TestClassFixture.prototype,
            TestClassFixture.prototype.runTest.name
        );

        expect(actual.function).to.equal(TestClassFixture.prototype.runTest.name);
    }

    @test
    public 'should use custom test name when one is specified'() {
        const actual: TestAnnotation = Reflect.getMetadata(
            testSymbol,
            TestClassFixture.prototype,
            TestClassFixture.prototype.runCustomTest.name
        );

        expect(actual.options.name).to.equals('my custom test');
    }

    @test
    public 'should have skip option set to true when skip option is set to true'() {
        const actual: TestAnnotation = Reflect.getMetadata(
            testSymbol,
            TestClassFixture.prototype,
            TestClassFixture.prototype.skippedTest.name
        );

        expect(actual.options.skip).to.not.be.undefined;
        expect(actual.options.skip).to.be.true;
    }

    @test
    public 'should have skip option set to false when skip option is not specified'() {
        const actual: TestAnnotation = Reflect.getMetadata(
            testSymbol,
            TestClassFixture.prototype,
            TestClassFixture.prototype.runTest.name
        );

        expect(actual.options.skip).to.be.false;
    }

    @test
    public 'should have skip option to false when skip option is set to false'() {
        const actual: TestAnnotation = Reflect.getMetadata(
            testSymbol,
            TestClassFixture.prototype,
            TestClassFixture.prototype.notSkippedTest.name
        );

        expect(actual.options.skip).to.be.false;
    }
}
