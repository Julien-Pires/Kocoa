import { expect } from 'chai';

import { test, testData, testSuite, TestSuiteAnnotation, testSuiteSymbol } from '../../src/index.js';

@testSuite('@testSuite')
export class TestSuiteMethodDecoratorTests {
    @test
    @testSuite('method')
    @testData({ testName: 'should contains test suite metadata when target has one annotation' })
    public shouldContainsSingleMetadata() {
        const actual = Reflect.getAllMetadata<TestSuiteAnnotation>(
            testSuiteSymbol,
            TestSuiteDecoratorSample.prototype,
            TestSuiteDecoratorSample.prototype.singleTestSuite.name
        );

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(1);
    }

    @test
    @testSuite('method')
    @testData({
        testName: 'should contains multiple test suite metadata when target has multiple annotation'
    })
    public shouldContainsMultipleMetadata() {
        const actual = Reflect.getAllMetadata<TestSuiteAnnotation>(
            testSuiteSymbol,
            TestSuiteDecoratorSample.prototype,
            TestSuiteDecoratorSample.prototype.multipleTestSuite.name
        );

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(3);
    }

    @test
    @testSuite('method')
    @testData({ testName: 'should contains correct test suite name when target has annotations' })
    public shouldContainsSuiteName() {
        const actual = Reflect.getAllMetadata<TestSuiteAnnotation>(
            testSuiteSymbol,
            TestSuiteDecoratorSample.prototype,
            TestSuiteDecoratorSample.prototype.multipleTestSuite.name
        );

        expect(actual).to.have.deep.members([{ name: 'testSuite' }, { name: 'sample' }, { name: 'method' }]);
    }
}

class TestSuiteDecoratorSample {
    @testSuite('testSuite')
    public singleTestSuite() {}

    @testSuite('testSuite')
    @testSuite('sample')
    @testSuite('method')
    public multipleTestSuite() {}
}
