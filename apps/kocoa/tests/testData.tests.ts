import chai from 'chai';
import chaiSubset from 'chai-subset';

import { suite, test, testData } from '../index.js';
import { testDataSymbol } from '../src/metadata.js';
import * as Reflect from '../src/reflect.js';
import { TestDataFixture } from './testData.fixtures.js';
import { TestDataAnnotation } from '../src/types/index.js';

const { expect } = chai;

chai.use(chaiSubset);

@suite('@testData')
export class TestDataDecoratorTests {
    @test
    public 'should not have data annotation when method is not annoted'() {
        const actual = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            TestDataFixture.prototype,
            TestDataFixture.prototype.noTestData.name
        );

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(0);
    }

    @test
    @testData(TestDataFixture.prototype.singleTestData.name, 1)
    @testData(TestDataFixture.prototype.multipleTestData.name, 3)
    public 'should have data annotations when method is annoted'(testMethod: string, expected: number) {
        const actual = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            TestDataFixture.prototype,
            testMethod
        );

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(expected);
    }

    @test
    public 'should contains data passed to the annotation'() {
        const annotations = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            TestDataFixture.prototype,
            TestDataFixture.prototype.multipleTestData.name
        );
        const actual = annotations.flatMap((annotation) => Array.from(annotation.args()));

        expect(actual).to.have.deep.members([
            [1, 2],
            [100, 200],
            [1000, 2000]
        ]);
    }

    @test
    @testData(1, 2, 3)
    @testData(100, 200, 300)
    @testData(9999, 1, 10000)
    public 'should apply data on test method'(numberOne: number, numberTwo: number, expected: number) {
        expect(numberOne + numberTwo).to.equals(expected);
    }
}
