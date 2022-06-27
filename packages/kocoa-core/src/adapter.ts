import { Spec, Suite } from './spec';

export interface Adapter {
    addSuite: <TTarget extends object>(
        suite: Suite,
        specs: Spec<Exclude<keyof TTarget, number>>[],
        target: TTarget
    ) => void;
}

export interface AdapterPlugin {
    adapter: Adapter;
}
