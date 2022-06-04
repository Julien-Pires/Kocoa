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
    static readonly emptyDataSource: [] = [];

    static readonly arrayDataSource: number[][] = [
        [1, 3, 4],
        [100, 300, 400],
        [1000, 3000, 4000]
    ];

    static readonly iterableDataSource = new DataClass([
        [2, 4, 6],
        [200, 400, 600],
        [2000, 4000, 6000]
    ]);

    /* eslint-disable @typescript-eslint/no-empty-function */ //
    static *emptyIterableDataSource() {}

    static arrayMethodDataSource(): number[][] {
        return MemberDataFixture.arrayDataSource;
    }

    static *iterableMethodDataSource() {
        yield [4, 2, 2];
        yield [400, 200, 200];
        yield [4000, 2000, 2000];
    }

    static *parameterizedDataSource(add: number) {
        yield [1 + add, 3 + add, 4 + add];
        yield [100 + add, 300 + add, 400 + add];
        yield [1000 + add, 3000 + add, 4000 + add];
    }

    public noDataSourceTest() {
        return true;
    }

    @memberData(MemberDataFixture.emptyDataSource)
    @memberData(MemberDataFixture.emptyIterableDataSource)
    public emptyDataSourceTest() {
        return true;
    }

    @memberData(MemberDataFixture.arrayDataSource)
    public singleDataSourceTest(first: number, second: number, expected: number) {
        return first + second == expected;
    }

    @memberData(MemberDataFixture.arrayDataSource)
    @memberData(MemberDataFixture.arrayMethodDataSource)
    public multipleDataSourceTest(first: number, second: number, expected: number) {
        return first + second == expected;
    }

    @memberData(MemberDataFixture.arrayDataSource)
    public arrayDataSourceTest(first: number, second: number, expected: number) {
        return first + second == expected;
    }

    @memberData(MemberDataFixture.iterableDataSource)
    public iterableDataSourceTest(first: number, second: number, expected: number) {
        return first + second == expected;
    }

    @memberData(MemberDataFixture.arrayMethodDataSource)
    public arrayMethodDataSourceTest(first: number, second: number, expected: number) {
        return first + second == expected;
    }

    @memberData(MemberDataFixture.iterableMethodDataSource)
    public iterableMethodDataSourceTest(first: number, second: number, expected: number) {
        return first + second == expected;
    }

    @memberData(MemberDataFixture.parameterizedDataSource, 2)
    public parameterizedDataSourceTest(first: number, second: number, expected: number) {
        return first + second == expected;
    }
}
