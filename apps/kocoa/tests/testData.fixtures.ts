import { testData } from '../index.js';

export class TestDataFixture {
    public noTestData() {
        return true;
    }

    @testData()
    public singleTestData() {
        return true;
    }

    @testData(1, 2)
    @testData(100, 200)
    @testData(1000, 2000)
    public multipleTestData(a: number, b: number) {
        return a + b;
    }
}
