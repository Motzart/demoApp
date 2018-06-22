'use strict';

const fs = require('fs');

const config = require('../../config');

module.exports = (req, res, next) => {
    const stats = fs.statSync(config.sourceFile);
    res.locals.fileSizeInMb = stats.size / 1000000;
    
    next();
}