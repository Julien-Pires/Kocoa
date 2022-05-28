import chalk from 'chalk';
import { exec } from 'child_process';
import clear from 'clear';
import { findUp } from 'find-up';
import * as fs from 'fs/promises';
import inquirer from 'inquirer';
import * as path from 'path';
import { promisify } from 'util';

import { exists, isNullOrEmpty, updateJSON } from '../utils/index.js';

const execAsync = promisify(exec);

interface Answers {
    project: string;
    projectDir: string;
    description: string;
}

const rushConfigFile = await findUp('rush.json');
if (!rushConfigFile) {
    throw new Error('Failed to find rush.json configuration.');
}

const rootDir = path.dirname(rushConfigFile);
const projectTemplateDir = path.join(rootDir, '/common/templates/project');

const questions = [
    {
        type: 'input',
        name: 'project',
        message: `Project name: `,
        validate: (input: string) => !isNullOrEmpty(input)
    },
    {
        type: 'input',
        name: 'projectDir',
        message: `Project directory: `,
        default: (answers: Answers) => path.join('apps', answers.project),
        validate: async (input: string) => {
            if (isNullOrEmpty(input)) {
                return false;
            }

            const fullpath = path.join(rootDir, input);
            const isAvailable = !(await exists(path.join(rootDir, input)));
            if (!isAvailable) {
                return chalk.red(`❗ Path already exists at: ${fullpath}`);
            }

            return true;
        }
    },
    {
        type: 'input',
        name: 'description',
        message: `Project description ${chalk.italic.grey('(Optional)')}: `
    }
];

clear();

console.log(chalk.bold.cyan('Following steps will guide to you add a new project.'));

const { project, projectDir, description } = await inquirer.prompt<Answers>(questions);
const projectInfo = {
    name: project,
    directory: projectDir,
    fullpath: path.join(rootDir, projectDir),
    description: description
};

console.log('\n⌛ Preparing project...');

await fs.cp(projectTemplateDir, projectInfo.fullpath, { recursive: true });
await updateJSON(path.join(projectInfo.fullpath, 'package.json'), () => ({ name: project, description: description }));

console.log(chalk.green(`✅ Project created at: ${projectInfo.fullpath}`));

console.log('\n⌛ Updating rush configuration...');

await updateJSON(rushConfigFile, (rushConfig) => ({
    projects: [
        ...(rushConfig !== null ? rushConfig['projects'] : []),
        {
            packageName: project,
            projectFolder: projectDir
        }
    ]
}));
const { stderr } = await execAsync('rush update');
if (stderr) {
    throw new Error(`❌ An error occurred while updating rush.\n${stderr}`);
}

console.log(chalk.green(`✅ Rush configuration updated`));
console.log(chalk.bold.green(`\nProject successfully created`));
