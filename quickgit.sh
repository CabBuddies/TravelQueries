#!/bin/bash
# My first script

git add .
echo "git added"
if [ $# -eq 0 ]; then
    git commit -am "..."
    echo "git commit"
else
    git commit -am "$1"
    echo "git commit"
fi
git push -u origin master
echo "git pushed"