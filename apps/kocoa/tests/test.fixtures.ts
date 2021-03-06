/* eslint-disable @typescript-eslint/no-empty-function */

import { test } from '../index.js';

export class TestClassFixture {
    public noTest() {}

    @test
    public runTest() {}

    @test({ name: 'my custom test' })
    public runCustomTest() {}

    @test({ skip: true })
    public skippedTest() {}

    @test({ skip: false })
    public notSkippedTest() {}
}
