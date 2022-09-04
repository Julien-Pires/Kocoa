import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import * as fs from 'fs/promises';
import * as path from 'path';
import tempy from 'tempy';

import { RushConfiguration } from '@microsoft/rush-lib';

import { publish } from '../index.js';

chai.use(chaiAsPromised);

describe('updateDependencies', () => {
    let folder = '';

    beforeEach(async () => {
        const rushFixtures = path.join(process.cwd(), '/fixtures');
        folder = tempy.directory();
        await fs.cp(rushFixtures, folder, { recursive: true });
    });

    it('should throw an error when target project does not exists', async () => {
        const cwd = path.join(folder, 'packages/unknown');
        const actual = publish({}, { cwd });

        await expect(actual).to.be.rejectedWith(`Failed to find project at ${cwd}`);
    });

    it('should preserve existing external dependency', async () => {
        const cwd = path.join(folder, 'packages/with-deps');
        await publish({}, { cwd });

        const actual = RushConfiguration.loadFromDefaultLocation({
            startingFolder: cwd
        }).findProjectByShorthandName('with-deps');

        expect(actual?.packageJson.dependencies).to.includes({ mocha: '~9.2.1' });
        expect(actual?.packageJson.devDependencies).to.includes({ typescript: '~4.7.2' });
    });

    it('should update dependency when project has workspace dependency', async () => {
        const cwd = path.join(folder, 'packages/with-deps');
        await publish({}, { cwd });

        const actual = RushConfiguration.loadFromDefaultLocation({
            startingFolder: cwd
        }).findProjectByShorthandName('with-deps');

        expect(actual?.packageJson.dependencies).to.includes({ 'no-deps': '1.0.0' });
    });

    it('should update dev dependency when project has workspace dependency', async () => {
        const cwd = path.join(folder, 'packages/with-deps');
        await publish({}, { cwd });

        const actual = RushConfiguration.loadFromDefaultLocation({
            startingFolder: cwd
        }).findProjectByShorthandName('with-deps');

        expect(actual?.packageJson.devDependencies).to.includes({ 'another-deps': '3.0.0' });
    });
});
