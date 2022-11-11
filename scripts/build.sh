#!/bin/bash
rm -rf dist
mkdir dist
cp LICENSE README.md package.json package-lock.json src/* dist
