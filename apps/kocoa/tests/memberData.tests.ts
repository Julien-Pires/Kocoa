import chai from 'chai';
import chaiSubset from 'chai-subset';

import { memberData, suite, test, testData } from '../index.js';
import { testDataSymbol } from '../src/metadata.js';
import * as Reflect from '../src/reflect.js';
import { TestDataAnnotation } from '../src/types/index.js';
import { MemberDataFixture } from './memberData.fixtures.js';

const { expect } = chai;

chai.use(chaiSubset);

@suite('@memberData')
export class MemberDataDecoratorTests {
    @test
    public 'should not have data annotation when method is not annoted'() {
        const actual = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            MemberDataFixture.prototype,
            MemberDataFixture.prototype.noMemberData.name
        );

        expect(actual).to.be.of.length(0);
    }

    @test
    @testData(MemberDataFixture.prototype.singleFieldDataTest.name, 1)
    @testData(MemberDataFixture.prototype.multiFieldDataTest.name, 2)
    public 'should have data annotations when method is annoted'(testMethod: string, count: number) {
        const actual = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            MemberDataFixture.prototype,
            testMethod
        );

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(count);
    }

    @test
    @testData(MemberDataFixture.prototype.emptyFieldDataTest.name)
    @testData(MemberDataFixture.prototype.emptyMethodDataTest.name)
    public 'should have no data entry when member data is empty'(testMethod: string) {
        const annotations = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            MemberDataFixture.prototype,
            testMethod
        );
        const actual = Array.from(annotations[0].args());

        expect(actual).to.be.of.length(0);
    }

    @test
    @testData(MemberDataFixture.prototype.arrayFieldDataTest.name, MemberDataFixture.oddNumber)
    @testData(MemberDataFixture.prototype.iterableFieldDataTest.name, MemberDataFixture.evenNumber)
    @testData(MemberDataFixture.prototype.arrayMethodDataTest.name, MemberDataFixture.getOddNumber())
    @testData(MemberDataFixture.prototype.iterableMethodDataTest.name, MemberDataFixture.getEvenNumber())
    public 'should contains one data entry for each member data entry'<T>(testMethod: string, expected: Iterable<T>) {
        const annotations = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            MemberDataFixture.prototype,
            testMethod
        );
        const actual = annotations.flatMap((annotation) => Array.from(annotation.args()));

        expect(actual).to.deep.equal(Array.from(expected));
    }

    @test
    @memberData(MemberDataFixture.oddNumber)
    @memberData(MemberDataFixture.getOddNumber)
    public 'should apply data on test method for each member data entry'(
        numberOne: number,
        numberTwo: number,
        expected: number
    ) {
        expect(numberOne + numberTwo).to.equals(expected);
    }

    @test
    public 'should apply member data args when member data is a method'() {
        const annotations = Reflect.getAllMetadata<TestDataAnnotation>(
            testDataSymbol,
            MemberDataFixture.prototype,
            MemberDataFixture.prototype.checkEmailTest.name
        );
        const actual = annotations.flatMap((annotation) => Array.from(annotation.args()));
        const expected = Array.from(MemberDataFixture.getEmails('myDomain.com'));

        expect(actual).to.have.deep.members(expected);
    }
}
