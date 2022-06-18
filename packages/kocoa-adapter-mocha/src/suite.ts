import { Suite } from 'mocha';

/**
 * Represents a test suite.
 */
export interface SuiteInfo {
    name: string;
    skip: boolean;
}

/**
 * Represents a Mocha test suite.
 */
export class MochaSuite extends Suite {
    /**
     * Constructor of MochaSuite class.
     * @param suite Object that contains information for this test suite.
     */
    constructor(private readonly suite: SuiteInfo) {
        super(suite.name);

        this.pending = this.suite.skip;
    }
}
