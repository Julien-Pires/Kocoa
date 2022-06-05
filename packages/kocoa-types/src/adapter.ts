import { Spec, Suite } from './spec';

export interface Adapter {
    addSuite: <TTarget>(
        suite: Suite,
        specs: Spec<Extract<keyof TTarget, string | symbol>>[],
        suiteTarget: TTarget
    ) => void;
}
