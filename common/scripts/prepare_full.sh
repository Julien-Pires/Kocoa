# Reset Husky folder

rm -rf ./.husky

husky install
husky add ./.husky/commit-msg 'rush commit:lint --edit $1'
chmod a+x .husky/commit-msg