import chai from 'chai';
import chaiSubset from 'chai-subset';

import { memberData, suite, test, testData } from '../index.js';
import { testDataSymbol } from '../src/metadata.js';
import * as Reflect from '../src/reflect.js';
import { TestDataAnnotation } from '../src/types/index.js';
import { MemberDataFixture } from './memberData.fixtures.js';

const { expect } = chai;

chai.use(chaiSubset);

@suite('@memberData annotation')
export class MemberDataDecoratorTests {
    @test({ name: 'should contains test data annotations when member is annoted' })
    @testData(MemberDataFixture.prototype.singleFieldDataTest.name, 1)
    @testData(MemberDataFixture.prototype.multiFieldDataTest.name, 2)
    public shouldContainsTestDataAnnotations(testMethod: string, count: number) {
        const actual = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            MemberDataFixture.prototype,
            testMethod
        );

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(count);
    }

    @test({ name: 'should contains no test data entry when target member data is empty' })
    @testData(MemberDataFixture.prototype.emptyFieldDataTest.name)
    public shouldNotContainsDataEntry(testMethod: string) {
        const actual = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            MemberDataFixture.prototype,
            testMethod
        );

        expect(actual[0].args()).to.be.of.length(0);
    }

    @test({ name: 'should contains one data entry for each member data entry' })
    @testData(MemberDataFixture.prototype.arrayFieldDataTest.name, MemberDataFixture.oddNumber)
    @testData(MemberDataFixture.prototype.iterableFieldDataTest.name, MemberDataFixture.evenNumber)
    public shouldContainsDataEntry<T>(testMethod: string, expected: Iterable<T>) {
        const annotations = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            MemberDataFixture.prototype,
            testMethod
        );
        const actual = annotations.flatMap((annotation) => Array.from(annotation.args()));

        expect(actual).to.deep.equal(Array.from(expected));
    }

    @test({ name: 'should call test method for each member data entry' })
    @memberData(MemberDataFixture.oddNumber)
    public shouldApplyTestDataToTestFunction(numberOne: number, numberTwo: number, expected: number) {
        expect(numberOne + numberTwo).to.equals(expected);
    }
}
