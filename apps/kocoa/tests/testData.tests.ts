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
    @test({ name: 'should contains test data metadata when target has one annotation' })
    public shouldAddSingleTestDataMetadata() {
        const actual = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            TestDataFixture.prototype,
            TestDataFixture.prototype.singleTestData.name
        );

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(1);
    }

    @test({ name: 'should contains multiple test data metadata when target has multiple annotation' })
    public shouldAddMultipleTestDataMetadata() {
        const actual = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            TestDataFixture.prototype,
            TestDataFixture.prototype.multipleTestData.name
        );

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(3);
    }

    @test({ name: 'should not contains fixtures when no fixtures has been specified' })
    public shouldNotContainsTestFixtures() {
        const actual = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            TestDataFixture.prototype,
            TestDataFixture.prototype.singleTestData.name
        );

        expect(actual).to.containSubset([{ args: [] }]);
    }

    @test({ name: 'should contains test fixtures when multiple fixtures have been specified' })
    public shouldContainsTestFixtures() {
        const actual = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            TestDataFixture.prototype,
            TestDataFixture.prototype.multipleTestData.name
        );

        expect(actual).to.containSubset([{ args: [1, 2] }, { args: [100, 200] }, { args: [1000, 2000] }]);
    }

    @test({ name: 'should apply test fixtures as arguments for target method' })
    @testData(1, 2, 3)
    @testData(100, 200, 300)
    @testData(9999, 1, 10000)
    public shouldPassTestFixturesToTestFunction(numberOne: number, numberTwo: number, expected: number) {
        expect(numberOne + numberTwo).to.equals(expected);
    }
}
