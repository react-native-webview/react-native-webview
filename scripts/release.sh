#!/bin/bash

# 1. Update package.json version
# 2. yarn release v1.0.0

# Script usage: ./relesase.sh VERSION_TAG
# eg. ./release.sh v11.0.2-ct.2

branch="classting"
version=$1

if [ -z "$version" ]
then
  echo "E: version tag is required"
  exit -1
fi

echo -n "Do you want release as '$version'? (Y/n): "
read answer

if [ "$answer" != "${answer#[Nn]}" ];
then
  exit 0
else
  echo "(1/3) Clean & install dependencies"
  rm -rf lib
  rm -rf node_modules && yarn
  mv .gitignore-release .gitignore

  echo "(2/3) Build typescript"
  yarn build

  echo "(3/3) Create release commit with tag"
  release_branch="release/$version"
  git checkout -b $release_branch
  git add .
  git commit -m "release: bump up version to $version"
  git tag $version
  git push origin $release_branch
  git push origin $version
fi
