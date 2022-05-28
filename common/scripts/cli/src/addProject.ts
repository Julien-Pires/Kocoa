import chalk from 'chalk';
import clear from 'clear';
import { findUp } from 'find-up';
import * as fs from 'fs/promises';
import inquirer from 'inquirer';
import * as path from 'path';

interface Answers {
    project: string;
    projectDir: string;
}

const isNullOrEmpty = (value: string) => !value || /^\s*$/.test(value);

const exists = async(path: string) => fs.access(path).then(() => true).catch(() => false);

const validateProjectDir = async (project: string, dir: string) => {
    if (isNullOrEmpty(dir)) {
        return false;
    }

    const fullPath = path.join(dir, project);
    if (await exists(fullPath)) {
        return chalk.red(`Path already exists: ${fullPath}`);
    }

    return true;
}

clear();

const rushConfigFile = await findUp('rush.json');
if (!rushConfigFile) {
    throw new Error('Failed to find rush.json configuration.');
}

const rootDir = path.dirname(rushConfigFile);

console.log(chalk.bold('Following steps will guide to you add a new project.'));
const answers = await inquirer.prompt([
    {
        type: 'input',
        name: 'project',
        message: `What's project name: `,
        validate: (input: string) => !isNullOrEmpty(input)
    },
    {
        type: 'input',
        name: 'projectDir',
        message: `What's project directory: `,
        default: 'apps',
        validate: (input: string, { project }: Answers) => validateProjectDir(project, path.join(rootDir, input))
    }
]);
const { project, projectDir } = answers;
const templateDir = path.join(rootDir, '/common/templates/project');
const fullPath = path.join(rootDir, projectDir, project);
await fs.cp(templateDir, fullPath, { recursive: true });