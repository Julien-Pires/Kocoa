import { cosmiconfig } from 'cosmiconfig';

export interface Configuration {
    adapter: string | undefined;
}

const defaultConfiguration: Configuration = {
    adapter: undefined
};

export const getConfiguration = async (configurationFile?: string): Promise<Configuration> => {
    const explorer = cosmiconfig('kocoa');
    const loadedConfig = await (configurationFile ? explorer.load(configurationFile) : explorer.search());
    if (!loadedConfig || loadedConfig.isEmpty) {
        return defaultConfiguration;
    }

    return {
        ...defaultConfiguration,
        adapter: loadedConfig.config.adapter
    };
};
