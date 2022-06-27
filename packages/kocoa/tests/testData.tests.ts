import chai from 'chai';
import chaiSubset from 'chai-subset';

import { suite, test, testData } from '../index.js';
import * as Annotation from './annotations/index.js';
import * as Reflect from './annotations/reflect.js';
import { TestDataFixture } from './testData.fixtures.js';
import { TestDataAnnotation } from './types/index.js';

const { expect } = chai;

chai.use(chaiSubset);

@suite('@testData')
export class TestDataDecoratorTests {
    @test
    public 'should not have data annotation when method is not annoted'() {
        const actual = Annotation.getTestDataMetadata(
            TestDataFixture.prototype,
            TestDataFixture.prototype.noDataSourceTest.name
        );

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(0);
    }

    @test
    @testData(TestDataFixture.prototype.singleDataSourceTest.name, 1)
    @testData(TestDataFixture.prototype.multipleDataSourceTest.name, 3)
    public 'should have data annotations when method is annoted'(testMethod: string, expected: number) {
        const actual = Annotation.getTestDataMetadata(
            TestDataFixture.prototype,
            testMethod
        );

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(expected);
    }

    @test
    public 'should contains data passed to the annotation'() {
        const annotations = Annotation.getTestDataMetadata(
            TestDataFixture.prototype,
            TestDataFixture.prototype.multipleDataSourceTest.name
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
    public 'should apply data on test method'(first: number, second: number, expected: number) {
        expect(first + second).to.equals(expected);
    }
}
