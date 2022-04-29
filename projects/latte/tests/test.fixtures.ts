import { test } from '../index.js';

export default class SkipTestFixture {
    @test({ skip: true })
    public skippedTest() {
        return true;
    }
}
