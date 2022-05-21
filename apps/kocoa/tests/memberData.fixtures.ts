import { memberData } from '../index.js';

class DataClass<T> implements Iterable<T> {
    constructor(private readonly _data: T[]) {}

    [Symbol.iterator]() {
        let index = -1;
        const data = this._data;

        return {
            next: () => ({ value: data[++index], done: !(index in data) })
        };
    }
}

export class MemberDataFixture {
    static readonly empty: [] = [];

    static readonly data: number[][] = [
        [1, 1, 2],
        [100, 100, 200],
        [1000, 1000, 2000]
    ];

    static readonly oddNumber: number[][] = [
        [1, 3, 4],
        [100, 300, 400],
        [1000, 3000, 4000]
    ];

    static readonly evenNumber = new DataClass([
        [2, 4, 6],
        [200, 400, 600],
        [2000, 4000, 6000]
    ]);

    /* eslint-disable @typescript-eslint/no-empty-function */ //
    static *getEmpty() {}

    static getOddNumber(): number[][] {
        return [
            [1, 3, 4],
            [100, 300, 400],
            [1000, 3000, 4000]
        ];
    }

    static *getEvenNumber() {
        yield [2, 4, 6];
        yield [200, 400, 600];
        yield [2000, 4000, 6000];
    }

    public noMemberData() {
        return true;
    }

    @memberData(MemberDataFixture.empty)
    public emptyFieldDataTest() {
        return true;
    }

    @memberData(MemberDataFixture.getEmpty)
    public emptyMethodDataTest() {
        return true;
    }

    @memberData(MemberDataFixture.oddNumber)
    public singleFieldDataTest(first: number, second: number, expected: number) {
        return first + second == expected;
    }

    @memberData(MemberDataFixture.evenNumber)
    @memberData(MemberDataFixture.oddNumber)
    public multiFieldDataTest(first: number, second: number, expected: number) {
        return first + second == expected;
    }

    @memberData(MemberDataFixture.oddNumber)
    public arrayFieldDataTest(first: number, second: number, expected: number) {
        return first + second == expected;
    }

    @memberData(MemberDataFixture.evenNumber)
    public iterableFieldDataTest(first: number, second: number, expected: number) {
        return first + second == expected;
    }

    @memberData(MemberDataFixture.getOddNumber)
    public arrayMethodDataTest(first: number, second: number, expected: number) {
        return first + second == expected;
    }

    @memberData(MemberDataFixture.getEvenNumber)
    public iterableMethodDataTest(first: number, second: number, expected: number) {
        return first + second == expected;
    }
}
