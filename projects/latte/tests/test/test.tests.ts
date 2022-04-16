import { expect } from 'chai';

import { test, TestAnnotation, testData, testSuite, testSymbol } from '../../src/index.js';

@testSuite('@test')
export class TestDecoratorTests {
    @test
    @testData({ testName: 'should add test metadata when method is annoted' })
    public shouldAddMetadata() {
        const actual: TestAnnotation = Reflect.getMetadata(testSymbol, this, this.shouldAddMetadata.name);

        expect(actual).to.not.be.undefined;
    }

    @test
    @testData({ testName: 'should contains method name when method is annoted' })
    public shouldContainsMethodName() {
        const actual: TestAnnotation = Reflect.getMetadata(testSymbol, this, this.shouldContainsMethodName.name);

        expect(actual.name).to.equal('shouldContainsMethodName');
    }

    @test
    @testData({ testName: 'should contains method body when method is annoted' })
    public shouldContainsMethod() {
        const actual: TestAnnotation = Reflect.getMetadata(testSymbol, this, this.shouldContainsMethod.name);

        expect(actual.function).to.equal(this.shouldContainsMethod);
    }
}