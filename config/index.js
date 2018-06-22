'use strict';

require('dotenv').config();

const server = require('./server');
const pathSettings = require('./pathSettings');

module.exports = Object.assign({}, server, pathSettings);
