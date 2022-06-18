import { Spec, Suite } from './spec';

export interface Adapter {
    addSuite: <TTarget extends object>(
        suite: Suite,
        specs: Spec<Extract<keyof TTarget, string | symbol>>[],
        target: TTarget
    ) => void;
}
