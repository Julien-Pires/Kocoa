export type Constructor<T> = { new (): T };

export interface IDisposable {
    dispose: () => void;
}
