'use strict';

const logger = require('winston-color');
const config = require('./config');

logger.info(`Starting Server on ${config.env} mode`);

require('./server');