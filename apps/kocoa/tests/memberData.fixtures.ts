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

    static *multiplyByTwo(number: number) {
        yield [number, number * 2];
    }

    public noMemberData() {
        return true;
    }

    @memberData(MemberDataFixture.empty)
    @memberData(MemberDataFixture.getEmpty)
    public emptyMemberDataTest() {
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

    @memberData(MemberDataFixture.multiplyByTwo, 2)
    public checkEmailTest(initial: number, result: number) {
        return initial * 2 === result;
    }
}
