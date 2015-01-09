#!/bin/bash

projectPath=$(cd "$(dirname "$0")"; pwd)

# build fonteditor
cd "${projectPath}/fonteditor"
sh build.sh

# mv to public
cd $projectPath

echo "fonteditor: rm old public ..."
rm -rf "${projectPath}/public/editor"

echo "fonteditor: mv to public ..."
mv fonteditor/release public/editor

echo "fonteditor: done"
