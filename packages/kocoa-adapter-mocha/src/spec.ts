import { Test } from 'mocha';

import { IDisposable, Spec, SpecRun } from '@kocoa/core';

export class MochaSpec extends Test implements IDisposable {
    private currentRun: SpecRun | null;

    constructor(private readonly spec: Spec) {
        super(spec.name);

        this.pending = spec.skip;
    }

    public create() {
        this.currentRun = this.spec.createRun();
    }

    public override fn: Mocha.Func | Mocha.AsyncFunc | undefined = () => {
        this.currentRun?.run();
    };

    public dispose(): void {
        this.currentRun?.dispose();
        this.currentRun = null;
    }
}
