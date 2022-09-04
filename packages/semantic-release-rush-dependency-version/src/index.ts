import { publish as publishPackage } from './publish.js';

export async function publish(_: Record<string, unknown>, { cwd }: { cwd: string }) {
    return publishPackage(cwd);
}
