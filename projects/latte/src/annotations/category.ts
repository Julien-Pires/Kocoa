import { runTest } from "../runner";
import { categorySymbol } from "./metadata";

export const category = (name: string): {
    (target: Function): void;
    (target: Object, propertyKey: string | symbol): void;
} => {
    return function(target: any, propertyKey: string | symbol) {
        Reflect.appendMetadata(categorySymbol, { name }, target, propertyKey);
        if (propertyKey) {
            return;
        }

        runTest(target);
    } as any;
};
