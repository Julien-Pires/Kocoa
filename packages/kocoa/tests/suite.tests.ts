import chai from 'chai';
import chaiSubset from 'chai-subset';

import { suite, test, testData } from '../index.js';
import { suiteSymbol } from '../src/metadata.js';
import * as Reflect from '../src/reflect.js';
import { MultipleSuiteFixture, SingleSuiteFixture, SkipOptionsFixtures } from './suite.fixtures.js';
import { SuiteAnnotation } from './types/annotations.js';

const { expect } = chai;

chai.use(chaiSubset);

@suite('@suite')
export class TestSuiteClassDecoratorTests {
    @test
    @testData(SingleSuiteFixture, 1)
    @testData(MultipleSuiteFixture, 3)
    public 'should contains test suite annotation when class is annoted'(prototype: object, expected: number) {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(suiteSymbol, prototype);

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
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(suiteSymbol, prototype);

        expect(actual).to.containSubset(expected);
    }

    @test
    @testData(MultipleSuiteFixture.prototype, MultipleSuiteFixture.prototype.singleTestSuite.name, 1)
    @testData(MultipleSuiteFixture.prototype, MultipleSuiteFixture.prototype.multipleTestSuite.name, 3)
    public 'should contains test suite annotation when method is annoted'(
        prototype: object,
        methodName: string,
        expected: number
    ) {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(suiteSymbol, prototype, methodName);

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(expected);
    }

    @test
    @testData(MultipleSuiteFixture.prototype, MultipleSuiteFixture.prototype.singleTestSuite.name, [
        { name: 'testSuite' }
    ])
    @testData(MultipleSuiteFixture.prototype, MultipleSuiteFixture.prototype.multipleTestSuite.name, [
        { name: 'testSuite' },
        { name: 'sample' },
        { name: 'method' }
    ])
    public 'should have specified name for test suite annotation on method'(
        prototype: object,
        methodName: string,
        expected: { name: string }[]
    ) {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(suiteSymbol, prototype, methodName);

        expect(actual).to.containSubset(expected);
    }

    @test
    @testData(SkipOptionsFixtures)
    @testData(SkipOptionsFixtures.prototype, SkipOptionsFixtures.prototype.skippedMethod.name)
    public 'should have skip option set to true when skip options is set to true'(
        prototype: object,
        methodName?: string
    ) {
        const actual = methodName
            ? Reflect.getAllMetadata<SuiteAnnotation>(suiteSymbol, prototype, methodName)
            : Reflect.getAllMetadata<SuiteAnnotation>(suiteSymbol, prototype);

        expect(actual[0].options.skip).to.be.true;
    }

    @test
    @testData(SingleSuiteFixture)
    @testData(MultipleSuiteFixture.prototype, MultipleSuiteFixture.prototype.singleTestSuite.name)
    public 'should have skip option set to false when skip options is not specified'(
        prototype: object,
        methodName?: string
    ) {
        const actual = methodName
            ? Reflect.getAllMetadata<SuiteAnnotation>(suiteSymbol, prototype, methodName)
            : Reflect.getAllMetadata<SuiteAnnotation>(suiteSymbol, prototype);

        expect(actual[0].options.skip).to.be.false;
    }
}
