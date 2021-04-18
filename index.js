// index.js
// Entry point

// Imports
const dbg = require('debug')('loriol').extend('web');
const express = require('express');
require('supports-color');      // Color support for 'debug'

// Declarations
const webServer = express();    // HTTP Server
require('./dataAPI');           // REST API

require('./lib/init');          // Initialization task

// Port
const port = process.env.PORT || 80; // Web server port

webServer.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile('./web/index.html');
})
dbg(`Server listening on port ${port}, GET '/'`);

webServer.listen(port);