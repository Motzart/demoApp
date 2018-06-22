'use strict';

const fs = require('fs');

const express = require('express');
const exphbs  = require('express-handlebars');
const config = require('../config');

const sseMiddleware = require('./middleware/sseMiddleware');
const getFileSizeMiddleware = require('./middleware/getFileSizeMiddleware');

const app = express();

let progress = 0;
let connection = null;

// view engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// add middleware
app.use(sseMiddleware);

// routes
app.get('/', getFileSizeMiddleware, (req, res) => {
    res.render('index', { fileSizeInMb:  res.locals.fileSizeInMb})
});

app.get('/copy', (req, res) => {
    
    const sourceFile = config.sourceFile;
    const targetFile = config.targetFile;

    fs.stat(sourceFile, (err, stat) => {
        
    	const size = stat.size
    	let bytes = 0

    	const rs = fs.createReadStream(sourceFile)

		rs.on('data', (buffer) => {
			bytes+= buffer.length
			let progress = ((bytes/size)*100).toFixed(0)
            connection.sseSend(parseInt(progress, 10));
        })
        
        const ws = fs.createWriteStream(targetFile);
		rs.pipe(ws);
    })
    res.sendStatus(200);
})

app.get('/stream', (req, res) => {
    res.sseSetup()
    res.sseSend(progress);
    connection = res;
});

process
    .on('unhandledRejection', (reason, p) => {
        logger.error(reason, 'Unhandled Rejection at Promise', p);
    })
    .on('uncaughtException', err => {
        logger.error(err, 'Uncaught Exception thrown');
        process.exit(1);
    });

module.exports = app;