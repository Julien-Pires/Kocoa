import chai from 'chai';
import chaiSubset from 'chai-subset';

import { memberData, suite, test, TestDataAnnotation, testDataSymbol } from '../index.js';
import * as Reflect from '../src/annotations/reflect.js';
import { MemberDataFixture } from './memberData.fixtures.js';

const { expect } = chai;

chai.use(chaiSubset);

@suite('@memberData')
export class MemberDataDecoratorTests {
    readonly data = [
        [1, 2, 3],
        [100, 200, 300],
        [9999, 1, 10000]
    ];

    @test({ name: 'should not contains test data when member data is empty' })
    public shouldContainsNoTestDataMetadata() {
        const actual = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            MemberDataFixture.prototype,
            MemberDataFixture.prototype.emptyMemberDataTest.name
        );

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(0);
    }

    @test({ name: 'should contains one additionnal test datas for each member entry' })
    public shouldContainsAllTestDataMetadata() {
        const actual = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            MemberDataFixture.prototype,
            MemberDataFixture.prototype.memberDataTest.name
        );

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(MemberDataFixture.prototype.data.length);
    }

    @test({ name: 'should contains test data from property' })
    public shouldHaveTestsData() {
        const annotations = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            MemberDataFixture.prototype,
            MemberDataFixture.prototype.memberDataTest.name
        );
        const actual = annotations.map((annotation) => annotation.args);
        
        expect(actual).to.deep.equal(MemberDataFixture.prototype.data);
    }

    @test({ name: 'should apply test data as arguments on target method' })
    @memberData('data')
    public shouldApplyTestDataToTestFunction(numberOne: number, numberTwo: number, expected: number) {
        expect(numberOne + numberTwo).to.equals(expected);
    }
}
