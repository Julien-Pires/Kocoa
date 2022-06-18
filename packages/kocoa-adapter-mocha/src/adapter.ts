import { describe, Suite as MochaSuite } from 'mocha';

import { Adapter, Spec, Suite } from '@kocoa/types';

import { MochaSpec } from './spec';

export class MochaAdapter implements Adapter {
    private readonly _rootSuite: MochaSuite;

    constructor() {
        this._rootSuite = describe('');
    }

    public addSuite<TTarget extends object>(
        suite: Suite,
        specs: Spec<Extract<keyof TTarget, string | symbol>>[],
        suiteTarget: TTarget
    ): void {
        const newSuite = new MochaSuite(suite.name);
        const specList = specs.reduce((acc: MochaSpec[], spec) => {
            for (const data of spec.data()) {
                acc.push(new MochaSpec(spec, data, suiteTarget));
            }
            return acc;
        }, []);
        for (const spec of specList) {
            newSuite.addTest(spec);
        }

        this._rootSuite.addSuite(newSuite);
    }
}
