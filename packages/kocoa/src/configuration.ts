import { cosmiconfig } from "cosmiconfig";

interface Configuration {
    adapter: string | undefined;
}

const defaultConfiguration: Configuration = {
    adapter: undefined
};

export const getConfiguration = async (configurationFile?: string): Promise<Configuration> => {
    const explorer = cosmiconfig('kocoa');
    const loadedConfig = await (configurationFile ? explorer.load(configurationFile) : explorer.search());
    if (loadedConfig?.isEmpty) {
        return defaultConfiguration;
    }

    return {
        ...defaultConfiguration,
        adapter:  loadedConfig?.config?.adapter 
    };
};
