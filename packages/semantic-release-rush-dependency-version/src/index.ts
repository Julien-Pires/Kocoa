import { publish as publishPackage } from './publish.js';

export async function publish(_: {}, { cwd }: { cwd: string; }) {
    return publishPackage(cwd);
}
