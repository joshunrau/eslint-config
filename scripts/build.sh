#!/bin/bash
rm -rf dist
mkdir dist
cp LICENSE README.md package.json yarn.lock src/* dist
