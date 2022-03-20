import { runTest } from "../runner";
import { testGroupSymbol } from "./metadata";

export const testGroup = (name?: string) => {
    return (target: any) => {
        Reflect.defineMetadata(testGroupSymbol, 
            { ...name ? { name } : {} }, 
        target);

        runTest(target);
    }
};
