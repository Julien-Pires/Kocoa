import { expect } from 'chai';

import { test, testData, testSuite, TestSuiteAnnotation, testSuiteSymbol } from '../src';

@testSuite('@testSuite')
export class TestSuiteDecoratorTests {
    @test
    @testData({ testName: 'should contains test suite metadata when target has at least one' })
    public shouldContainsMetadata() {
        const actual: TestSuiteAnnotation = Reflect.getMetadata(testSuiteSymbol, TestSuiteDecoratorTests);

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(1);
    }

    @test
    @testData({ testName: 'should contains correct test suite name when target has some' })
    public shouldContainsSuiteName() {
        const actual = Reflect.getAllMetadata<TestSuiteAnnotation>(testSuiteSymbol, TestSuiteDecoratorTests);

        expect(actual).to.deep.include({
            name: '@testSuite'
        });
    }
}
