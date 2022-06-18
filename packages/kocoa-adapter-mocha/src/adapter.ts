import { describe, Suite as MochaSuite } from 'mocha';

import { Adapter, Spec, Suite } from '@kocoa/types';

import { MochaSpec } from './spec';

/**
 * Adapter class for Mocha to run suite and tests.
 */
export class MochaAdapter implements Adapter {
    private readonly _rootSuite: MochaSuite;

    /**
     * Constructor of MochaAdapter class.
     */
    constructor() {
        this._rootSuite = describe('');
    }

    /**
     * Adds a test suite to the current Mocha run.
     * @param suite Test suite informations.
     * @param specs List of specs contained in the test suite.
     * @param target Prototype of the class that owns the test suite.
     */
    public addSuite<TTarget extends object>(
        suite: Suite,
        specs: Spec<Extract<keyof TTarget, string | symbol>>[],
        target: TTarget
    ): void {
        const newSuite = new MochaSuite(suite.name);
        const specList = specs.reduce((acc: MochaSpec[], spec) => {
            for (const data of spec.data()) {
                acc.push(new MochaSpec(spec, data, target));
            }
            return acc;
        }, []);
        for (const spec of specList) {
            newSuite.addTest(spec);
        }

        this._rootSuite.addSuite(newSuite);
    }
}
