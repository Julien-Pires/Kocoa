import { expect } from 'chai';

import { test, testData, testSuite, TestSuiteAnnotation, testSuiteSymbol } from '../../src/index.js';

@testSuite('@testSuite')
export class TestSuiteClassDecoratorTests {
    @test
    @testSuite('class')
    @testData({ testName: 'should contains test suite metadata when target has one annotation' })
    public shouldContainsSingleMetadata() {
        const actual = Reflect.getAllMetadata<TestSuiteAnnotation>(testSuiteSymbol, SingleTestSuiteDecoratorSample);

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(1);
    }

    @test
    @testSuite('class')
    @testData({ testName: 'should contains mutliple test suite metadata when target has multiple annotation' })
    public shouldContainsMultipleMetadata() {
        const actual = Reflect.getAllMetadata<TestSuiteAnnotation>(testSuiteSymbol, MultipleTestSuiteDecoratorSample);

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(3);
    }

    @test
    @testSuite('class')
    @testData({ testName: 'should contains correct test suite name when target has annotations' })
    public shouldContainsSuiteName() {
        const actual = Reflect.getAllMetadata<TestSuiteAnnotation>(testSuiteSymbol, MultipleTestSuiteDecoratorSample);

        expect(actual).to.have.deep.members([{ name: 'testSuite' }, { name: 'sample' }, { name: 'class' }]);
    }
}

@testSuite('testSuite')
class SingleTestSuiteDecoratorSample {}

@testSuite('testSuite')
@testSuite('sample')
@testSuite('class')
class MultipleTestSuiteDecoratorSample {}
