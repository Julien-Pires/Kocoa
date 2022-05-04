# Add pre-commit hooks

husky install
husky add ./.husky/commit-msg 'rush commit:lint --edit $1'
chmod a+x .husky/commit-msg