import EventEmitter from 'events';

import { Annotation, AnnotationDefinition } from './types.js';

type AnnotationsEvents = {
    name: 'Added';
    args: [target: object, propertyKey?: string | symbol];
};

class AnnotationEventEmitter {
    private readonly emitter = new EventEmitter();

    public on<TAction extends AnnotationsEvents['name']>(
        annotation: Annotation<AnnotationDefinition>,
        action: TAction,
        listener: (...args: Extract<AnnotationsEvents, { name: TAction }>['args']) => void
    ): this {
        const { _definition: definition } = annotation;
        this.emitter.on(`${definition.key}${action}`, listener);

        return this;
    }

    public off<TAction extends AnnotationsEvents['name']>(
        annotation: Annotation<AnnotationDefinition>,
        action: TAction,
        listener: (...args: Extract<AnnotationsEvents, { name: TAction }>['args']) => void
    ): this {
        const { _definition: definition } = annotation;
        this.emitter.off(`${definition.key}${action}`, listener);

        return this;
    }

    public emit<TAction extends AnnotationsEvents['name']>(
        annotation: Annotation<AnnotationDefinition>,
        action: TAction,
        ...args: Extract<AnnotationsEvents, { name: TAction }>['args']
    ): boolean {
        const { _definition: definition } = annotation;

        return this.emitter.emit(`${definition.key}${action}`, ...args);
    }
}

export const annotationsEvents = new AnnotationEventEmitter();
