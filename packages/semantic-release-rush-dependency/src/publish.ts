import { DependencyType, RushConfiguration, RushConfigurationProject } from '@microsoft/rush-lib';

function getDependencyType(project: RushConfigurationProject, dependency: string): DependencyType | undefined {
    const dep = project.packageJsonEditor.tryGetDependency(dependency);
    if (dep) {
        return dep.dependencyType;
    }

    return project.packageJsonEditor.tryGetDevDependency(dependency)?.dependencyType;
}

export async function publish(cwd: string) {
    const configuration = RushConfiguration.loadFromDefaultLocation({ startingFolder: cwd });
    const projectLookup = configuration.getProjectLookupForRoot(cwd);
    const project = projectLookup.findChildPath('');
    if (!project) {
        throw new Error(`Failed to find project at ${cwd}`);
    }

    const packageEditor = project.packageJsonEditor;
    for (const dependency of project.dependencyProjects) {
        const dependencyType = getDependencyType(project, dependency.packageName);
        if (!dependencyType) {
            throw new Error(`Failed to retrieve dependency type for ${dependency.packageName}`);
        }

        packageEditor.addOrUpdateDependency(dependency.packageName, dependency.packageJson.version, dependencyType);
    }
    packageEditor.saveIfModified();
}
