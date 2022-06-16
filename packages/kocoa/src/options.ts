import { cosmiconfig } from "cosmiconfig";

interface Options {
    adapter: string | undefined;
}

const defaultOptions: Options = {
    adapter: undefined
};

export const getOptions = async (configurationFile?: string): Promise<Options> => {
    const explorer = cosmiconfig('kocoa');
    const loadedConfig = await explorer.search();
    if (loadedConfig?.isEmpty) {
        return defaultOptions;
    }

    return {
        ...defaultOptions,
        adapter:  loadedConfig?.config?.adapter 
    };
};
