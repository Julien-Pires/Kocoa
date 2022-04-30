import chai from 'chai';
import chaiSubset from 'chai-subset';

import { suite, SuiteAnnotation, suiteSymbol, test, testData } from '../index.js';
import * as Reflect from '../src/annotations/reflect.js';
import { MultipleSuiteFixture, SingleSuiteFixture, SkipOptionsFixtures } from './suite.fixtures.js';

const { expect } = chai;

chai.use(chaiSubset);

@suite('@suite')
export class TestSuiteClassDecoratorTests {
    @test
    @suite('class')
    @testData({ testName: 'should contains suite metadata when class has one annotation' })
    public classShouldContainsSingleSuite() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(suiteSymbol, SingleSuiteFixture);

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(1);
    }

    @test
    @suite('class')
    @testData({ testName: 'should contains mutliple suite metadata when class has multiple annotation' })
    public classShouldContainsMultipleSuite() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(suiteSymbol, MultipleSuiteFixture);

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(3);
    }

    @test
    @suite('class')
    @testData({ testName: 'should contains correct suite name when target has annotations' })
    public classShouldContainsSuiteName() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(suiteSymbol, MultipleSuiteFixture);

        expect(actual).to.containSubset([{ name: 'testSuite' }, { name: 'sample' }, { name: 'class' }]);
    }

    @test
    @suite('method')
    @testData({ testName: 'should contains test suite metadata when target has one annotation' })
    public methodShouldContainsSingleSuite() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(
            suiteSymbol,
            MultipleSuiteFixture.prototype,
            MultipleSuiteFixture.prototype.singleTestSuite.name
        );

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(1);
    }

    @test
    @suite('method')
    @testData({
        testName: 'should contains multiple test suite metadata when target has multiple annotation'
    })
    public methodShouldContainsMultipleSuite() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(
            suiteSymbol,
            MultipleSuiteFixture.prototype,
            MultipleSuiteFixture.prototype.multipleTestSuite.name
        );

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(3);
    }

    @test
    @suite('method')
    @testData({ testName: 'should contains correct suite name when target has annotations' })
    public methodShouldContainsSuiteName() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(
            suiteSymbol,
            MultipleSuiteFixture.prototype,
            MultipleSuiteFixture.prototype.multipleTestSuite.name
        );

        expect(actual).to.containSubset([{ name: 'testSuite' }, { name: 'sample' }, { name: 'method' }]);
    }

    @test
    @suite('class')
    @testData({ testName: 'should have skip options to true when skip options is used' })
    public shouldHaveSkipOptionsOnClass() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(suiteSymbol, SkipOptionsFixtures);

        expect(actual[0].options.skip).to.not.be.undefined;
        expect(actual[0].options.skip).to.be.true;
    }

    @test
    @suite('class')
    @testData({ testName: 'should have skip options to false when skip options is not used' })
    public shouldNotHaveSkipOptionsOnClass() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(suiteSymbol, SingleSuiteFixture);

        expect(actual[0].options.skip).to.be.false;
    }

    @test
    @suite('method')
    @testData({ testName: 'should have skip options to true when skip options is used' })
    public shouldHaveSkipOptionsOnMethod() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(
            suiteSymbol,
            SkipOptionsFixtures.prototype,
            SkipOptionsFixtures.prototype.skippedMethod.name
        );

        expect(actual[0].options.skip).to.not.be.undefined;
        expect(actual[0].options.skip).to.be.true;
    }

    @test
    @suite('method')
    @testData({ testName: 'should have skip options to false when skip options is not used' })
    public shouldNotHaveSkipOptionsOnMethod() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(
            suiteSymbol,
            MultipleSuiteFixture.prototype,
            MultipleSuiteFixture.prototype.singleTestSuite.name
        );

        expect(actual[0].options.skip).to.be.false;
    }
}
