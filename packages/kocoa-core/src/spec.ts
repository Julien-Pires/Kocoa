import { IDisposable } from './core.js';

export interface Spec {
    name: string;
    skip: boolean;
    createRun(): SpecRun;
}

export interface SpecRun extends IDisposable {
    run(): void;
}

export interface SuiteDefinition {
    name: string;
    skip: boolean;
}

export interface Suite {
    add(spec: Spec): void;
}
