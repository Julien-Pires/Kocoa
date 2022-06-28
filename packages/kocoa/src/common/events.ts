import { EventEmitter } from 'events';

export type Event = {
    name: string | symbol;
    args: unknown[];
};

export class TypedEventEmiter<TEvents extends Event> extends EventEmitter {
    public override on<TName extends TEvents['name']>(
        name: TName,
        listener: (...args: Extract<TEvents, { name: TName }>['args']) => void
    ): this {
        super.on(name, listener);

        return this;
    }

    public override off<TName extends TEvents['name']>(
        name: TName,
        listener: (...args: Extract<TEvents, { name: TName }>['args']) => void
    ): this {
        super.off(name, listener);

        return this;
    }

    public override emit<TName extends TEvents['name']>(
        name: TName,
        ...args: Extract<TEvents, { name: TName }>['args']
    ): boolean {
        return super.emit(name, ...args);
    }
}
