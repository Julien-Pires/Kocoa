import { CommentJSONValue, parse } from 'comment-json';
import * as fs from 'fs/promises';

export async function readPkg(path: string): Promise<CommentJSONValue> {
    const jsonContent = parse(await fs.readFile(path, 'utf-8'));
    if (!jsonContent) {
        throw new Error(`Failed to read JSON file at: ${path}`);
    }

    return jsonContent;
}
