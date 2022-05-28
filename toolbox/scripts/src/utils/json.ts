import { CommentJSONValue, parse, stringify } from 'comment-json';
import * as fs from 'fs/promises';

export type JSONUpdater = (json: CommentJSONValue) => Record<string | symbol, unknown>;

export const updateJSON = async (file: string, updater: JSONUpdater) => {
    const jsonContent = parse(await fs.readFile(file, 'utf-8'));
    if (!jsonContent) {
        throw new Error(`Failed to read JSON file at: ${file}`);
    }

    const newValues = updater(jsonContent);
    const updatedJsonContent = Object.entries(newValues).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, jsonContent);
    await fs.writeFile(file, stringify(updatedJsonContent, null, 4));
};
