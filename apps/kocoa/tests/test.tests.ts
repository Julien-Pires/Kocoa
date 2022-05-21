import { expect } from 'chai';

import { suite, test } from '../index.js';
import { testSymbol } from '../src/metadata.js';
import { SkipTestFixture } from './test.fixtures.js';
import { TestAnnotation } from '../src/types';

@suite('@test')
export class TestDecoratorTests {
    @test({ name: 'should add test metadata when method is annoted' })
    public shouldAddTestMetadataWhenAnnoted() {
        const actual: TestAnnotation = Reflect.getMetadata(
            testSymbol,
            this,
            this.shouldAddTestMetadataWhenAnnoted.name
        );

        expect(actual).to.not.be.undefined;
    }

    @test({ name: 'should contains method name when method is annoted' })
    public shouldContainsMethodNameWhenAnnoted() {
        const actual: TestAnnotation = Reflect.getMetadata(
            testSymbol,
            this,
            this.shouldContainsMethodNameWhenAnnoted.name
        );

        expect(actual.function).to.equal(this.shouldContainsMethodNameWhenAnnoted.name);
    }

    @test({ name: 'should have custom name options when one is specified' })
    public shouldHaveCustomNameWhenSpecified() {
        const actual: TestAnnotation = Reflect.getMetadata(
            testSymbol,
            TestDecoratorTests.prototype,
            TestDecoratorTests.prototype.shouldHaveCustomNameWhenSpecified.name
        );

        expect(actual.options.name).to.equals('should have custom name options when one is specified');
    }

    @test
    public 'should not have custom name options when one is not specified'() {
        const actual: TestAnnotation = Reflect.getMetadata(
            testSymbol,
            TestDecoratorTests.prototype,
            TestDecoratorTests.prototype['should not have custom name options when one is not specified'].name
        );

        expect(actual.options.name).to.be.undefined;
    }

    @test({ name: 'should have skip options to true when skip options is set to true' })
    public shouldHaveSkipOptionsWhenSpecifiedWithTrue() {
        const actual: TestAnnotation = Reflect.getMetadata(
            testSymbol,
            SkipTestFixture.prototype,
            SkipTestFixture.prototype.skippedTest.name
        );

        expect(actual.options.skip).to.not.be.undefined;
        expect(actual.options.skip).to.be.true;
    }

    @test({ name: 'should have skip options to false when skip options is set to false' })
    public shouldHaveSkipOptionsWhenSpecifiedWithFalse() {
        const actual: TestAnnotation = Reflect.getMetadata(
            testSymbol,
            SkipTestFixture.prototype,
            SkipTestFixture.prototype.notSkippedTest.name
        );

        expect(actual.options.skip).to.not.be.undefined;
        expect(actual.options.skip).to.be.false;
    }

    @test({ name: 'should have skip options to false when skip options is not specified' })
    public shouldNotHaveSkipOptionsWhenNotSpecified() {
        const actual: TestAnnotation = Reflect.getMetadata(
            testSymbol,
            TestDecoratorTests.prototype,
            TestDecoratorTests.prototype.shouldNotHaveSkipOptionsWhenNotSpecified.name
        );

        expect(actual.options.skip).to.be.false;
    }
}
