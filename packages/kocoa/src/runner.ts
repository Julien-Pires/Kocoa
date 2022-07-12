import { Adapter, AdapterPlugin } from '@kocoa/core';

import { SuiteAnnotation, TestAnnotation, TestAnnotationAttribute, TestDataAnnotation } from './annotations.js';
import { getConfiguration } from './configuration.js';
import { annotationsEvents, getAnnotation } from './core/index.js';
import { IDisposable } from './types/common.js';

export class Runner implements IDisposable {
    private constructor(private readonly adapter: Adapter) {
        annotationsEvents.on(SuiteAnnotation, 'Added', (target) => this.addSuite(target));
    }

    public static async create(configurationFile?: string): Promise<Runner> {
        const configuration = await getConfiguration(configurationFile);
        if (!configuration.adapter) {
            throw new Error('No test runner adapter specified.');
        }

        const { default: module }: { default: AdapterPlugin } = await import(configuration.adapter);

        return new Runner(module.adapter);
    }

    public dispose() {
        annotationsEvents.off(SuiteAnnotation, 'Added', this.addSuite);
    }

    private static getSuiteAnnotation(target: object) {
        return getAnnotation(SuiteAnnotation, target);
    }

    private static getSpecAnnotations(target: object) {
        const properties = Object.getOwnPropertyDescriptors((target as any).prototype);
        return Object.keys(properties)
            .map((property) => getAnnotation(TestAnnotation, target, property))
            .filter((annotation): annotation is TestAnnotationAttribute => annotation !== null);
    }

    private static getSpecDataAnnotations(spec: TestAnnotationAttribute, target: object): (readonly unknown[])[] {
        const specDataAnnotations = getAnnotation(TestDataAnnotation, target, spec.method);
        if (specDataAnnotations.length === 0) {
            return [[]];
        }

        return specDataAnnotations.flatMap((specData) => Array.from(specData.args()));
    }

    public addSuite(target: object) {
        const suiteAnnotation = Runner.getSuiteAnnotation(target);
        if (!suiteAnnotation) {
            throw new Error(`Failed to retrieve suite for ${target}`);
        }

        const specsAnnotation = Runner.getSpecAnnotations(target);
        const suite = {
            name: suiteAnnotation.name,
            skip: suiteAnnotation.options.skip
        };

        const specs = specsAnnotation.flatMap((spec) => {
            const specDatas = Runner.getSpecDataAnnotations(spec, target);
            return specDatas.map((data) => ({
                name: spec.name,
                function: spec.method,
                skip: spec.options.skip,
                data
            }));
        });
        this.adapter.addSuite(suite, specs, target as any);
    }
}
