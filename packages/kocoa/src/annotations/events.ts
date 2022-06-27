import { EventEmitter } from 'events';

export enum RunnerEvent {
    SuiteAdded = 'SuiteAdded',
    TestAdded = 'TestAdded'
}

export interface SuiteEventArgs {
    target: object;
}

export interface TestEventArgs {
    target: object;
    propertyKey: string | symbol;
}

type RunnerEventArgs<TEvent extends RunnerEvent> = TEvent extends RunnerEvent.SuiteAdded
    ? [target: SuiteEventArgs]
    : [target: TestEventArgs];

type Eventmitter = <TEvent extends RunnerEvent>(event: TEvent, ...args: RunnerEventArgs<TEvent>) => RunnerEventEmitter;

type EventHandler = <TEvent extends RunnerEvent>(
    event: TEvent,
    listener: (...args: RunnerEventArgs<TEvent>) => void
) => RunnerEventEmitter;

export interface RunnerEventEmitter {
    emit: Eventmitter;
    on: EventHandler;
    off: EventHandler;
}

export function createRunnerEventEmitter(): RunnerEventEmitter {
    const emitter = new EventEmitter();

    return {
        emit: function (event, ...args) {
            emitter.emit(event, ...args);
            return this;
        },
        on: function (event, listener) {
            emitter.on(event, listener);
            return this;
        },
        off: function (event, listener) {
            emitter.off(event, listener);
            return this;
        }
    };
}
