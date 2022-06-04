/* eslint-disable @typescript-eslint/no-empty-function */

import { suite } from '../index.js';

@suite('testSuite')
export class SingleSuiteFixture {}

@suite('testSuite')
@suite('sample')
@suite('class')
export class MultipleSuiteFixture {
    @suite('testSuite')
    public singleTestSuite() {}

    @suite('testSuite')
    @suite('sample')
    @suite('method')
    public multipleTestSuite() {}
}

@suite('SkipClass', { skip: true })
export class SkipOptionsFixtures {
    @suite('SkipMethod', { skip: true })
    public skippedMethod() {}
}
