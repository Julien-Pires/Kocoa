import { IDisposable } from './core.js';

export interface SpecDefinition {
    name: string;
    skip: boolean;
    init(): SpecRun;
}

export interface SpecRun extends IDisposable {
    run(): void;
}

export interface SuiteDefinition {
    name: string;
    skip: boolean;
}

export interface Suite {
    add(spec: SpecDefinition): void;
}
