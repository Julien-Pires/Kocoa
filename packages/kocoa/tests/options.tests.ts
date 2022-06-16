import { expect } from 'chai';

import { suite, test, testData } from '../index.js';
import { getOptions } from '../src/options.js';

@suite('options')
export class OptionsTests {
    @test
    public async 'should return default configuration when configuration file is not found'() {
        const actual = await getOptions();

        expect(actual).to.deep.equal({
            adapter: undefined
        });
    }

    @test
    @testData('.kocoarc')
    public async 'should load options from configuration file'(configurationFile: string) {
        const actual = await getOptions(configurationFile);

        expect(actual).to.deep.equal({
            adapter: '@kocoa/adapter-mocha'
        });
    }
}
