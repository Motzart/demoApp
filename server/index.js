'use strict';

const app = require('./server');
const config = require('../config');
const logger = require('winston-color');
const exitCode = 1;

app.listen(config.server.port, (err) => {
    if(err) {
        logger.error('Error happened during server start', err);
        process.exit(exitCode);
    }
    logger.info(`SERVER: App is listening on port ${config.server.port}`);
});
