import { assign, CommentJSONValue } from 'comment-json';

interface Package {
    name: string;
    version: string;
}

const dependenciesCategory = ['dependencies', 'peerDependencies', 'devDependencies'];

function updateDependencyList(dependencies: CommentJSONValue, packages: Map<string, Package>): CommentJSONValue {
    if (dependencies === null) {
        return dependencies;
    }

    const updatedDependencies = Object.getOwnPropertyNames(dependencies).reduce((acc, property) => {
        const packageInfo = packages.get(property);
        if (packageInfo === undefined) {
            return acc;
        }

        acc[property] = packageInfo.version;

        return acc;
    }, {});

    return assign(dependencies, updatedDependencies);
}

export function updateDependencies(packageJSON: CommentJSONValue, packages: Map<string, Package>): CommentJSONValue {
    if (packageJSON === null) {
        return null;
    }

    const updatedDependencies = dependenciesCategory.reduce((acc, category) => {
        if (!packageJSON[category]) {
            return acc;
        }

        acc[category] = updateDependencyList(packageJSON[category], packages);

        return acc;
    }, {});

    return assign(packageJSON, updatedDependencies);
}
