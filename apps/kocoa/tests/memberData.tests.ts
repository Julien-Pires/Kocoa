import chai from 'chai';
import chaiSubset from 'chai-subset';

import { memberData, suite, test } from '../index.js';
import { testDataSymbol } from '../src/metadata.js';
import * as Reflect from '../src/reflect.js';
import { MemberDataFixture } from './memberData.fixtures.js';
import { TestDataAnnotation } from '../src/types/index.js';

const { expect } = chai;

chai.use(chaiSubset);

@suite('@memberData')
export class MemberDataDecoratorTests {
    static readonly data = [
        [1, 2, 3],
        [100, 200, 300],
        [9999, 1, 10000]
    ];

    @test({ name: 'should not contains test data when member data is empty' })
    public shouldContainsNoTestDataMetadata() {
        const actual = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            MemberDataFixture.prototype,
            MemberDataFixture.prototype.emptyFieldDataTest.name
        );

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(0);
    }

    @test({ name: 'should contains one additionnal test datas for each member entry' })
    public shouldContainsAllTestDataMetadata() {
        const actual = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            MemberDataFixture.prototype,
            MemberDataFixture.prototype.fieldDataTest.name
        );

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(MemberDataFixture.data.length);
    }

    @test({ name: 'should contains test data from property' })
    public shouldHaveTestsData() {
        const annotations = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            MemberDataFixture.prototype,
            MemberDataFixture.prototype.fieldDataTest.name
        );
        const actual = annotations.map((annotation) => annotation.args);
        
        expect(actual).to.deep.equal(MemberDataFixture.data);
    }

    @test({ name: 'should apply test data as arguments on target method' })
    @memberData(MemberDataDecoratorTests.data)
    public shouldApplyTestDataToTestFunction(numberOne: number, numberTwo: number, expected: number) {
        expect(numberOne + numberTwo).to.equals(expected);
    }
}
