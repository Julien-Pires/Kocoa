import { expect } from 'chai';

import { suite, test, TestAnnotation, testData, testSymbol } from '../index.js';
import { SkipTestFixture } from './test.fixtures.js';

@suite('@test')
export class TestDecoratorTests {
    @test
    @testData({ testName: 'should add test metadata when method is annoted' })
    public shouldAddTestMetadata() {
        const actual: TestAnnotation = Reflect.getMetadata(testSymbol, this, this.shouldAddTestMetadata.name);

        expect(actual).to.not.be.undefined;
    }

    @test
    @testData({ testName: 'should contains method name when method is annoted' })
    public shouldContainsMethodName() {
        const actual: TestAnnotation = Reflect.getMetadata(testSymbol, this, this.shouldContainsMethodName.name);

        expect(actual.name).to.equal(this.shouldContainsMethodName.name);
    }

    @test
    @testData({ testName: 'should have skip options to true when skip options is used' })
    public shouldHaveSkipOptions() {
        const actual: TestAnnotation = Reflect.getMetadata(
            testSymbol,
            SkipTestFixture.prototype,
            SkipTestFixture.prototype.skippedTest.name
        );

        expect(actual.options.skip).to.not.be.undefined;
        expect(actual.options.skip).to.be.true;
    }

    @test
    @testData({ testName: 'should have skip options to false when skip options is not used' })
    public shouldNotHaveSkipOptions() {
        const actual: TestAnnotation = Reflect.getMetadata(
            testSymbol,
            TestDecoratorTests.prototype,
            TestDecoratorTests.prototype.shouldNotHaveSkipOptions.name
        );

        expect(actual.options.skip).to.be.false;
    }
}
