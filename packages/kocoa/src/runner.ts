import { Adapter, AdapterPlugin } from '@kocoa/core';

import * as Annotation from './annotations/index';
import { RunnerEvent, SuiteEventArgs } from './annotations/index.js';
import { getConfiguration } from './configuration.js';
import { IDisposable } from './types/common.js';

export class Runner implements IDisposable {
    private constructor(private readonly adapter: Adapter) {
        Annotation.events.on(RunnerEvent.SuiteAdded, this.addSuite);
    }

    public static async create(configurationFile?: string): Promise<Runner> {
        const configuration = await getConfiguration(configurationFile);
        if (!configuration.adapter) {
            throw new Error('No test runner adapter specified.');
        }

        const { adapter }: AdapterPlugin = await import(configuration.adapter);

        return new Runner(adapter);
    }

    public dispose() {}

    public addSuite(suiteArgs: SuiteEventArgs) {
        const { target } = suiteArgs;
        const suiteAnnotation = Annotation.getSuiteMetadata(target);
        const specsAnnotation = Annotation.getTestMetadata(target);
        const suite = {
            name: suiteAnnotation.name,
            skip: suiteAnnotation.options.skip
        };
        const specs = specsAnnotation.flatMap((spec) => {
            const specDataAnnotations = Annotation.getTestDataMetadata(target, spec.function);
            const specDatas = specDataAnnotations.flatMap((annotation) => Array.from(annotation.args()));
            return specDatas.map((data) => ({
                name: spec.name,
                function: spec.function,
                skip: spec.options.skip,
                data
            }));
        });
        this.adapter.addSuite(suite, specs, target as any);
    }
}
