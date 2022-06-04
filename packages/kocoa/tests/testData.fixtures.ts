/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import { testData } from '../index.js';

export class TestDataFixture {
    public noDataSourceTest() {}

    @testData()
    public singleDataSourceTest() {}

    @testData(1, 2)
    @testData(100, 200)
    @testData(1000, 2000)
    public multipleDataSourceTest(_a: number, _b: number) {}
}
