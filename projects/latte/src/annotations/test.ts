import { testSymbol } from "./metadata";

export const test = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(testSymbol, {
        name: propertyKey,
        function: descriptor.value
    }, target, propertyKey);
};
