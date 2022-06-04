import { testData } from '../index.js';

export class TestDataFixture {
    public noTestData() {}

    @testData()
    public singleTestData() {}

    @testData(1, 2)
    @testData(100, 200)
    @testData(1000, 2000)
    public multipleTestData(a: number, b: number) {}
}
