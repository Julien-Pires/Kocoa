import { memberData } from '../index.js';

export class MemberDataFixture {
    readonly empty: [];

    readonly data: [number, string, string][] = [
        [1, 'Foo', 'Foo: 1'],
        [100, 'Bar', 'Bar: 100'],
        [1000, 'Foobar', 'Foobar: 1000']
    ]

    @memberData('empty')
    public emptyMemberDataTest() {
        return true;
    }

    @memberData('data')
    public memberDataTest(quantity: number, item: string, expected: string) {
        return `${item}: ${quantity}` == expected;
    }
}
