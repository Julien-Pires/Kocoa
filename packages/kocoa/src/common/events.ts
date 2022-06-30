import { EventEmitter } from 'events';

export type Event = {
    name: string | symbol;
    args: unknown[];
};

export class TypedEventEmiter<TEvents extends Event> extends EventEmitter {
    public override on<TName extends TEvents['name']>(
        eventName: TName,
        listener: (...args: Extract<TEvents, { name: TName }>['args']) => void
    ): this {
        super.on(eventName, listener);

        return this;
    }

    public override off<TName extends TEvents['name']>(
        eventName: TName,
        listener: (...args: Extract<TEvents, { name: TName }>['args']) => void
    ): this {
        super.off(eventName, listener);

        return this;
    }

    public override emit<TName extends TEvents['name']>(
        eventName: TName,
        ...args: Extract<TEvents, { name: TName }>['args']
    ): boolean {
        return super.emit(eventName, ...args);
    }
}
