import { expect } from 'chai';
import * as path from 'path';

import { suite, test, testData } from '../index.js';
import { getConfiguration } from '../src/configuration.js';

@suite('getConfiguration')
export class GetConfigurationTests {
    @test
    public async 'should return default configuration when configuration file is not found'() {
        const actual = await getConfiguration();

        expect(actual).to.deep.equal({
            adapter: undefined
        });
    }

    @test
    @testData('.kocoarc', '@kocoa/adapter-configuration')
    @testData('.kocoarc.json', '@kocoa/adapter-configuration-json')
    @testData('.kocoarc.yaml', '@kocoa/adapter-configuration-yaml')
    @testData('package.json', '@kocoa/adapter-configuration-package')
    public async 'should load options from configuration file'(configurationFile: string, adapter: string) {
        const filepath = path.join(process.cwd(), 'tests/configurations', configurationFile);
        const actual = await getConfiguration(filepath);

        expect(actual).to.deep.equal({ adapter });
    }
}
