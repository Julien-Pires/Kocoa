/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

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
    public emptyDataSourceTest() {}

    @memberData(MemberDataFixture.arrayDataSource)
    public singleDataSourceTest(__first: number, __second: number, __expected: number) {}

    @memberData(MemberDataFixture.arrayDataSource)
    @memberData(MemberDataFixture.arrayMethodDataSource)
    public multipleDataSourceTest(__first: number, _second: number, _expected: number) {}

    @memberData(MemberDataFixture.arrayDataSource)
    public arrayDataSourceTest(_first: number, _second: number, _expected: number) {}

    @memberData(MemberDataFixture.iterableDataSource)
    public iterableDataSourceTest(_first: number, _second: number, _expected: number) {}

    @memberData(MemberDataFixture.arrayMethodDataSource)
    public arrayMethodDataSourceTest(_first: number, _second: number, _expected: number) {}

    @memberData(MemberDataFixture.iterableMethodDataSource)
    public iterableMethodDataSourceTest(_first: number, _second: number, _expected: number) {}

    @memberData(MemberDataFixture.parameterizedDataSource, 2)
    public parameterizedDataSourceTest(_first: number, _second: number, _expected: number) {}
}
