import { publish as publishPackage } from './publish.js';

export async function publish(_, { cwd }) {
    return await publishPackage(cwd);
}
