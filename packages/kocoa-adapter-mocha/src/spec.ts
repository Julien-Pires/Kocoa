import { Test } from 'mocha';

interface SpecInfo {
    name: string;
    function: string | symbol;
    skip: boolean;
}

export class MochaSpec extends Test {
    constructor(private readonly spec: SpecInfo, private readonly data: unknown[], private readonly instance: object) {
        super(spec.name);

        this.fn = this.runSync;
        this.pending = this.spec.skip;
    }

    public runSync() {
        const instance = Object.create(this.instance);
        instance[this.spec.function](...this.data);
    }
}
