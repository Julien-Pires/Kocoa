import { test } from '../index.js';

export class TestClass {
    public noTest() {
        return true;
    }

    @test
    public runTest() {
        return true;
    }

    @test({ name: 'my custom test' })
    public runCustomTest() {
        return true;
    }

    @test({ skip: true })
    public skippedTest() {
        return true;
    }

    @test({ skip: false })
    public notSkippedTest() {
        return true;
    }
}
