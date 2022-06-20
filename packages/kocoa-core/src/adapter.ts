import { Spec, Suite } from './spec';

export interface Adapter {
    addSuite: <TTarget>(
        suite: Suite,
        specs: Spec<Extract<keyof TTarget, string | symbol>>[],
        target: TTarget
    ) => void;
}

export interface AdapterPlugin {
    adapter: Adapter;
}
