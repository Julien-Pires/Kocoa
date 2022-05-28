import * as fs from 'fs/promises';

export const exists = async (path: string) =>
    fs
        .access(path)
        .then(() => true)
        .catch(() => false);
