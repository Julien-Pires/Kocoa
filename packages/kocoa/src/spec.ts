import { Constructor, IDisposable, SpecRun } from '@kocoa/core';

export class Spec<TSuite, TFunc extends keyof TSuite> implements SpecRun {
    private readonly _suite: TSuite;

    constructor(
        suiteCtor: Constructor<TSuite>,
        private readonly func: TFunc,
        private readonly data: readonly unknown[]
    ) {
        this._suite = new suiteCtor();
    }

    private static isDisposable(instance: unknown): instance is IDisposable {
        return (instance as IDisposable).dispose !== undefined;
    }

    public run(): void {
        this._suite[String(this.func)](...this.data);
    }

    public dispose(): void {
        if (Spec.isDisposable(this._suite)) {
            this._suite.dispose();
        }
    }
}
