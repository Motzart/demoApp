'use strict';

const path = require("path");

const dataPath = path.join(process.cwd() + '/data/');
const sourceFile = path.join(dataPath, 'initial.csv');
const targetFile = path.join(dataPath, 'copy.csv');

const settings = {
    dataPath,
    sourceFile,
    targetFile
};

module.exports = settings;