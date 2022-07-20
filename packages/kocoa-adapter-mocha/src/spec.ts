import { Test } from 'mocha';

import { IDisposable, SpecDefinition, SpecRun } from '@kocoa/core';

export class MochaSpec extends Test implements IDisposable {
    private currentRun: SpecRun | null;

    constructor(private readonly spec: SpecDefinition) {
        super(spec.name);

        this.pending = spec.skip;
    }

    public init() {
        this.currentRun = this.spec.init();
    }

    public override fn: Mocha.Func | Mocha.AsyncFunc | undefined = () => {
        this.currentRun?.run();
    };

    public dispose(): void {
        this.currentRun?.dispose();
        this.currentRun = null;
    }
}
