import chai from 'chai';
import chaiSubset from 'chai-subset';

import { suite, test } from '../index.js';
import { suiteSymbol } from '../src/metadata.js';
import * as Reflect from '../src/reflect.js';
import { MultipleSuiteFixture, SingleSuiteFixture, SkipOptionsFixtures } from './suite.fixtures.js';
import { SuiteAnnotation } from './types/annotations.js';

const { expect } = chai;

chai.use(chaiSubset);

@suite('@suite')
export class TestSuiteClassDecoratorTests {
    @test({ name: 'should contains suite metadata when class has one annotation' })
    @suite('class')
    public classShouldContainsSingleSuiteWhenAnnoted() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(suiteSymbol, SingleSuiteFixture);

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(1);
    }

    @test({ name: 'should contains mutliple suite metadata when class has multiple annotation' })
    @suite('class')
    public classShouldContainsMultipleSuiteWhenAnnoted() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(suiteSymbol, MultipleSuiteFixture);

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(3);
    }

    @test({ name: 'should contains correct suite name when class has annotations' })
    @suite('class')
    public classShouldContainsSuiteNameWhenAnnoted() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(suiteSymbol, MultipleSuiteFixture);

        expect(actual).to.containSubset([{ name: 'testSuite' }, { name: 'sample' }, { name: 'class' }]);
    }

    @test({ name: 'should contains test suite metadata when method has one annotation' })
    @suite('method')
    public methodShouldContainsSingleSuiteWhenAnnoted() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(
            suiteSymbol,
            MultipleSuiteFixture.prototype,
            MultipleSuiteFixture.prototype.singleTestSuite.name
        );

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(1);
    }

    @test({ name: 'should contains multiple test suite metadata when method has multiple annotation' })
    @suite('method')
    public methodShouldContainsMultipleSuiteWhenAnnoted() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(
            suiteSymbol,
            MultipleSuiteFixture.prototype,
            MultipleSuiteFixture.prototype.multipleTestSuite.name
        );

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(3);
    }

    @test({ name: 'should contains correct suite name when method has annotations' })
    @suite('method')
    public methodShouldContainsSuiteNameWhenAnnoted() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(
            suiteSymbol,
            MultipleSuiteFixture.prototype,
            MultipleSuiteFixture.prototype.multipleTestSuite.name
        );

        expect(actual).to.containSubset([{ name: 'testSuite' }, { name: 'sample' }, { name: 'method' }]);
    }

    @test({ name: 'should have skip options to true when skip options is used' })
    @suite('class')
    public shouldHaveSkipOptionsOnClassWhenSpecified() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(suiteSymbol, SkipOptionsFixtures);

        expect(actual[0].options.skip).to.not.be.undefined;
        expect(actual[0].options.skip).to.be.true;
    }

    @test({ name: 'should have skip options to false when skip options is not used' })
    @suite('class')
    public shouldNotHaveSkipOptionsOnClassWhenNotSpecified() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(suiteSymbol, SingleSuiteFixture);

        expect(actual[0].options.skip).to.be.false;
    }

    @test({ name: 'should have skip options to true when skip options is used' })
    @suite('method')
    public shouldHaveSkipOptionsOnMethodWhenSpecified() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(
            suiteSymbol,
            SkipOptionsFixtures.prototype,
            SkipOptionsFixtures.prototype.skippedMethod.name
        );

        expect(actual[0].options.skip).to.not.be.undefined;
        expect(actual[0].options.skip).to.be.true;
    }

    @test({ name: 'should have skip options to false when skip options is not used' })
    @suite('method')
    public shouldNotHaveSkipOptionsOnMethodWhenNotSpecified() {
        const actual = Reflect.getAllMetadata<SuiteAnnotation>(
            suiteSymbol,
            MultipleSuiteFixture.prototype,
            MultipleSuiteFixture.prototype.singleTestSuite.name
        );

        expect(actual[0].options.skip).to.be.false;
    }
}
