import { Test } from 'mocha';

/**
 * Represents test informations.
 */
export interface SpecInfo {
    name: string;
    function: string | symbol;
    skip: boolean;
}

/**
 * Represents a Mocha test to run with specified test data.
 */
export class MochaSpec extends Test {
    /**
     * Constructor of MochaSpec class.
     * @param spec Informations about the current test.
     * @param data Test data to use when running the test.
     * @param target Prototype of the class that owns this test.
     */
    constructor(private readonly spec: SpecInfo, private readonly data: unknown[], private readonly target: object) {
        super(spec.name);

        this.pending = spec.skip;
        this.fn = this.runSync;
    }

    /**
     * Runs the current test on the specified target.
     */
    public runSync() {
        const instance = Object.create(this.target);
        instance[this.spec.function](...this.data);
    }
}
