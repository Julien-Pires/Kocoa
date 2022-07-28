import * as Mocha from 'mocha';

import { Adapter, Suite, SuiteDefinition } from '@kocoa/core';

import { MochaSuite } from './suite.js';

/**
 * Adapter class for Mocha library.
 */
export class MochaAdapter implements Adapter {
    private readonly _rootSuite: Mocha.Suite;

    /**
     * Constructor of MochaAdapter class.
     */
    constructor() {
        this._rootSuite = describe('', () => {
            return;
        });
        if (this._rootSuite.parent) {
            const parentSuite = this._rootSuite.parent;
            parentSuite.suites = parentSuite.suites.filter((suite) => suite !== this._rootSuite);
            this._rootSuite = parentSuite;
        }
    }

    public create(suite: SuiteDefinition): Suite {
        const mochaSuite = new MochaSuite(suite.name);
        this._rootSuite.addSuite(mochaSuite);

        return mochaSuite;
    }
}
