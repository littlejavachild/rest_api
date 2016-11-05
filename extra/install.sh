#!/usr/bin/env bash

# Check if nodejs is installed
if which node > /dev/null
then
    echo "Please install node.js and re-run this script"
    exit 1
fi

# Check if MongoDB is installed
if which mongod > /dev/null
then
    echo "Please install MongoDB and re-run this script"
    exit 1
fi

# Check if git is installed
if which git > /dev/null
then
    echo "Please install git and re-run this script"
    exit 1
fi

cd ~
git clone https://github.com/littlejavachild/rest_api.git
cd rest_api
npm install
npm start &