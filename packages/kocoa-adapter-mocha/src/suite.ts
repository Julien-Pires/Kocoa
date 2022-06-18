import { Suite } from 'mocha';

export interface SuiteInfo {
    name: string;
    skip: boolean;
}

export class MochaSuite extends Suite {
    constructor(private readonly suite: SuiteInfo) {
        super(suite.name);

        this.pending = this.suite.skip;
    }
}
