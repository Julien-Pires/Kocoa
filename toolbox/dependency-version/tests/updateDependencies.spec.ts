import { expect } from 'chai';
import { parse } from 'comment-json';

import { updateDependencies } from '../src/updateDependencies.js';

describe('updateDependencies', () => {
    it('should return null when input package is null', () => {
        const actual = updateDependencies(
            null,
            new Map([
                [
                    'typescript',
                    {
                        name: 'typescript',
                        version: '4.8.0'
                    }
                ]
            ])
        );

        expect(actual).to.be.null;
    });

    it('should not update package.json when there is no dependencies', () => {
        const packageJSON = parse(`{}`);

        const actual = updateDependencies(
            packageJSON,
            new Map([
                [
                    'typescript',
                    {
                        name: 'typescript',
                        version: '4.8.0'
                    }
                ]
            ])
        );

        expect(actual).to.deep.equals(packageJSON);
    });

    it('should not update package.json when there is no workspace package dependencies', () => {
        const packageJSON = parse(`{
            "devDependencies": {
                "typescript": "4.7.0"
            },
            "dependencies": {
                "node": "16.0.0"
            },
            "peerDependencies": {
               "mocha": "9.0.0"
            }
        }`);

        const actual = updateDependencies(
            packageJSON,
            new Map([
                [
                    'typescript',
                    {
                        name: 'typescript',
                        version: '4.8.0'
                    }
                ]
            ])
        );

        expect(actual).to.deep.equals(packageJSON);
    });

    it('should update package.json when there are workspace packages dependencies', () => {
        const packageJSON = parse(`{
            "devDependencies": {
                "typescript": "workspace:*"
            },
            "dependencies": {
                "node": "workspace:*"
            },
            "peerDependencies": {
               "mocha": "workspace:*"
            }
        }`);

        const actual = updateDependencies(
            packageJSON,
            new Map([
                [
                    'typescript',
                    {
                        name: 'typescript',
                        version: '4.8.0'
                    }
                ],
                [
                    'node',
                    {
                        name: 'node',
                        version: '18.0.0'
                    }
                ],
                [
                    'mocha',
                    {
                        name: 'mocha',
                        version: '10.0.0'
                    }
                ]
            ])
        );

        expect(actual).to.deep.equals(
            parse(`{
            "devDependencies": {
                "typescript": "4.8.0"
            },
            "dependencies": {
                "node": "18.0.0"
            },
            "peerDependencies": {
               "mocha": "10.0.0"
            }
        }`)
        );
    });
});
