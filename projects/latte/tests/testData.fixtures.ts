import { testData } from '../index.js';

export class TestDataFixture {
    @testData()
    public singleTestData() {
        return true;
    }

    @testData(1, 2, { testName: '1 plus 2 should return 3' })
    @testData(100, 200, { testName: '100 plus 200 should return 300' })
    @testData(1000, 2000, { testName: '1000 plus 2000 should return 3000' })
    public multipleTestData(a: number, b: number) {
        return a + b;
    }
}
