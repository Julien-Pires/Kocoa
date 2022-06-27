import chai from 'chai';
import chaiSubset from 'chai-subset';

import { memberData, suite, test, testData } from '../index.js';
import * as Annotation from './annotations/index.js';
import { MemberDataFixture } from './memberData.fixtures.js';

const { expect } = chai;

chai.use(chaiSubset);

@suite('@memberData')
export class MemberDataDecoratorTests {
    @test
    public 'should not have data annotation when method is not annoted'() {
        const actual = Annotation.getTestDataMetadata(
            MemberDataFixture.prototype,
            MemberDataFixture.prototype.noDataSourceTest.name
        );

        expect(actual).to.be.of.length(0);
    }

    @test
    @testData(MemberDataFixture.prototype.singleDataSourceTest.name, 1)
    @testData(MemberDataFixture.prototype.multipleDataSourceTest.name, 2)
    public 'should have data annotations when method is annoted'(testMethod: string, count: number) {
        const actual = Annotation.getTestDataMetadata(MemberDataFixture.prototype, testMethod);

        expect(actual).to.not.be.undefined;
        expect(actual).to.be.of.length(count);
    }

    @test
    public 'should have no data entry when member data is empty'() {
        const annotations = Annotation.getTestDataMetadata(
            MemberDataFixture.prototype,
            MemberDataFixture.prototype.emptyDataSourceTest.name
        );
        const actual = annotations.flatMap((annotation) => Array.from(annotation.args()));

        expect(actual).all.members([]);
    }

    @test
    @testData(MemberDataFixture.prototype.arrayDataSourceTest.name, MemberDataFixture.arrayDataSource)
    @testData(MemberDataFixture.prototype.iterableDataSourceTest.name, MemberDataFixture.iterableDataSource)
    @testData(MemberDataFixture.prototype.arrayMethodDataSourceTest.name, MemberDataFixture.arrayMethodDataSource())
    @testData(
        MemberDataFixture.prototype.iterableMethodDataSourceTest.name,
        MemberDataFixture.iterableMethodDataSource()
    )
    public 'should contains one data entry for each member data entry'<T>(testMethod: string, expected: Iterable<T>) {
        const annotations = Annotation.getTestDataMetadata(MemberDataFixture.prototype, testMethod);
        const actual = annotations.flatMap((annotation) => Array.from(annotation.args()));

        expect(actual).to.deep.equal(Array.from(expected));
    }

    @test
    @memberData(MemberDataFixture.arrayDataSource)
    @memberData(MemberDataFixture.arrayMethodDataSource)
    public 'should apply data on test method for each member data entry'(
        first: number,
        second: number,
        expected: number
    ) {
        expect(first + second).to.equals(expected);
    }

    @test
    public 'should apply additional parameters when member data is a function with parameters'() {
        const annotations = Annotation.getTestDataMetadata(
            MemberDataFixture.prototype,
            MemberDataFixture.prototype.parameterizedDataSourceTest.name
        );
        const actual = annotations.flatMap((annotation) => Array.from(annotation.args()));
        const expected = Array.from(MemberDataFixture.parameterizedDataSource(2));

        expect(actual).to.have.deep.members(expected);
    }
}
