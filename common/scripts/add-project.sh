read -r -p 'Project name: ' projectName
read -r -p 'Project path (default /apps): ' projectPath

declare fullpath="${projectPath}/${projectName}/"
echo "$fullpath"
if [ ! -f "$fullpath" ]; then
    mkdir -p "$fullpath"
fi

cp -r ./common/templates/project/ "${projectPath}/${projectName}"