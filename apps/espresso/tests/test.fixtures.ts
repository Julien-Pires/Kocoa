import { test } from '../index.js';

export class SkipTestFixture {
    @test({ skip: true })
    public skippedTest() {
        return true;
    }

    @test({ skip: false })
    public notSkippedTest() {
        return true;
    }
}
