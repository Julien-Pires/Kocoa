import * as Mocha from 'mocha';

import { Spec, Suite } from '@kocoa/core';

import { MochaSpec } from './spec.js';

interface MochaSuiteRunContext {
    currentSpec: number;
}

export class MochaSuite extends Mocha.Suite implements Suite {
    private runContext: MochaSuiteRunContext | null;

    public override tests: MochaSpec[] = [];

    constructor(name: string) {
        super(name);

        this.beforeAll(this.init.bind(this));
        this.beforeEach(this.createCurrentTest.bind(this));
        this.afterEach(this.disposeCurrentTest.bind(this));
        this.afterEach(this.moveToNextTest.bind(this));
    }

    private ensureContext(): MochaSuiteRunContext {
        if (!this.runContext) {
            throw new Error('No current run context found.');
        }

        return this.runContext;
    }

    private init() {
        this.runContext = {
            currentSpec: 0
        };
    }

    private createCurrentTest() {
        const { currentSpec } = this.ensureContext();
        this.tests[currentSpec].create();
    }

    private disposeCurrentTest() {
        const { currentSpec } = this.ensureContext();
        this.tests[currentSpec].dispose();
    }

    private moveToNextTest() {
        const { currentSpec } = this.ensureContext();
        this.runContext = {
            ...this.runContext,
            currentSpec: currentSpec + 1
        };
    }

    public add(spec: Spec): void {
        this.addTest(new MochaSpec(spec));
    }
}
