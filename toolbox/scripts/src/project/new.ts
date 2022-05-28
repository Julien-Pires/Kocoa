import chalk from 'chalk';
import { exec } from 'child_process';
import clear from 'clear';
import { parse, stringify } from 'comment-json';
import { findUp } from 'find-up';
import * as fs from 'fs/promises';
import inquirer from 'inquirer';
import * as path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

interface Answers {
    project: string;
    projectDir: string;
    description: string;
}

interface ProjectInfo {
    name: string;
    directory: string;
    rootDir: string;
    description: string;
}

const rushConfigFile = await findUp('rush.json');
if (!rushConfigFile) {
    throw new Error('Failed to find rush.json configuration.');
}

const rootDir = path.dirname(rushConfigFile);
const projectTemplateDir = path.join(rootDir, '/common/templates/project');

const isNullOrEmpty = (value: string) => !value || /^\s*$/.test(value);

const exists = async (path: string) =>
    fs
        .access(path)
        .then(() => true)
        .catch(() => false);

const validateProjectDir = async (project: string, dir: string) => {
    if (isNullOrEmpty(dir)) {
        return false;
    }

    const fullPath = path.join(dir, project);
    if (await exists(fullPath)) {
        return chalk.red(`Path already exists: ${fullPath}`);
    }

    return true;
};

const copyProjectTemplate = async (project: ProjectInfo): Promise<string> => {
    const fullPath = path.join(project.rootDir, project.directory);
    await fs.cp(projectTemplateDir, fullPath, { recursive: true });

    return fullPath;
};

const updatePackageJson = async (project: ProjectInfo) => {
    const fullPath = path.join(project.rootDir, project.directory);
    const packageJsonPath = path.join(fullPath, 'package.json');
    const packageJson = parse(await fs.readFile(packageJsonPath, 'utf-8'));
    if (!packageJson) {
        throw new Error(`Failed to read package.json at: ${packageJsonPath}`);
    }

    packageJson['name'] = project.name;
    packageJson['description'] = project.description;
    await fs.writeFile(packageJsonPath, stringify(packageJson, null, 4));
};

const updateRushConfig = async (project: ProjectInfo) => {
    const rushConfig = parse(await fs.readFile(rushConfigFile, 'utf-8'));
    if (!rushConfig) {
        throw new Error(`Failed to read rush configuration file at: ${rushConfigFile}`);
    }
    rushConfig['projects'].push({
        packageName: project.name,
        projectFolder: project.directory
    });
    await fs.writeFile(rushConfigFile, stringify(rushConfig, null, 4));
};

clear();

console.log(chalk.bold.cyan('Following steps will guide to you add a new project.'));
const answers = await inquirer.prompt<Answers>([
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
        default: 'apps',
        validate: (input: string, { project }: Answers) => validateProjectDir(project, path.join(rootDir, input))
    },
    {
        type: 'input',
        name: 'description',
        message: `Project description: `
    }
]);

const projectInfo = {
    name: answers.project,
    directory: answers.projectDir,
    rootDir,
    description: answers.description
};
console.log('Preparing project...');
const projectFullPath = await copyProjectTemplate(projectInfo);
await updatePackageJson(projectInfo);
console.log(chalk.green(`Project created at: ${projectFullPath}`));

console.log('Updating rush configuration...');
await updateRushConfig(projectInfo);
const { stderr } = await execAsync('rush update');
if (stderr) {
    throw new Error(`An error occurred will updating rush.\n${stderr}`);
}
console.log(chalk.green(`Rush configuration updated`));
