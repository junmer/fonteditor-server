#!/bin/bash

projectPath=$(cd "$(dirname "$0")"; pwd)

# build fe
cd "${projectPath}/fonteditor"
sh build.sh

# mv to public
cd $projectPath

echo "rm old public ..."
rm -rf "${projectPath}/public"

echo "mv to public ..."
mv fonteditor/release public

echo "done"
