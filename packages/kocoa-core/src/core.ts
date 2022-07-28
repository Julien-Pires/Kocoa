export type Constructor<T> = { new (): T };

export type PrototypeKeys<T> = T extends { prototype: infer TProto }
    ? Exclude<keyof TProto, number>
    : Exclude<keyof T, number>;

export interface IDisposable {
    dispose: () => void;
}
