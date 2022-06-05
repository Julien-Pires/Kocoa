import { Spec, Suite } from './spec';

export interface Adapter {
    createSuite: (suite: Suite, obj: unknown) => void;
    createSpec: (spec: Spec, obj: unknown) => void;
}
