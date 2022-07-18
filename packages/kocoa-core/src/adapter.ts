import { Suite, SuiteDefinition } from './spec.js';

export interface Adapter {
    create: (suite: SuiteDefinition) => Suite;
}

export interface AdapterPlugin {
    adapter: Adapter;
}
