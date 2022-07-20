/* eslint-disable @typescript-eslint/no-empty-function */

import { suite } from '../index.js';

@suite('testSuite')
export class SingleSuiteFixture {}

@suite('SkipClass', { skip: true })
export class SkipOptionsFixtures {}
