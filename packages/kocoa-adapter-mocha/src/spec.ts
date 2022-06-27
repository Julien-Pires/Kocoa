import { Test } from 'mocha';

import { Spec } from '@kocoa/core';

/**
 * Represents a Mocha test to run with specified test data.
 */
export class MochaSpec<TTarget extends object, TFunc extends Exclude<keyof TTarget, number>> extends Test {
    /**
     * Constructor of MochaSpec class.
     * @param spec Object that contains information for this test.
     * @param target Prototype of the class that owns this test.
     */
    constructor(private readonly spec: Spec<TFunc>, private readonly target: TTarget) {
        super(spec.name);

        this.pending = spec.skip;
        this.fn = this.runSync;
    }

    /**
     * Runs the current test on the specified target.
     */
    public runSync() {
        const instance = Object.create(this.target);
        instance[this.spec.function](...this.spec.data);
    }
}
