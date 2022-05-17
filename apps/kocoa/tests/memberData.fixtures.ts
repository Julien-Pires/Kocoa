import { memberData } from '../index.js';

export class MemberDataFixture {
    static readonly empty: [];

    static readonly data: [number, string, string][] = [
        [1, 'Foo', 'Foo: 1'],
        [100, 'Bar', 'Bar: 100'],
        [1000, 'Foobar', 'Foobar: 1000']
    ]

    static * getEmpty() {}

    static * getData(): Iterable<[number, number, number]> {
        yield [1, 1, 2];
        yield [100, 100, 200];
        yield [1000, 1000, 2000];
    }

    @memberData(MemberDataFixture.empty)
    public emptyFieldDataTest() {
        return true;
    }

    @memberData(MemberDataFixture.data)
    public fieldDataTest(quantity: number, item: string, expected: string) {
        return `${item}: ${quantity}` == expected;
    }

    @memberData(MemberDataFixture.getEmpty)
    public emptyMethodDataTest() {
        return true;
    }

    @memberData(MemberDataFixture.getData)
    public methodDataTest(first: number, second: number, expected: number) {
        return first + second == expected;
    }
}
