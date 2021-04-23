#!/usr/bin/env node
// index.js
// Entry point

// Imports
const bcrypt = require('bcryptjs');
//const cookieParser = require('cookie-parser')   // Cookie support for express
const debug = require('debug');
const dbg = debug('loriol').extend('web');
const express = require('express');
const fs = require('fs');
const jsonFormat = require('json-format')
const path = require('path');
require('supports-color');      // Color support for 'debug'

// Declarations
const webServer = express();    // HTTP Server
require('./lib/init');          // Initialization task
require('./dataAPI');           // REST API

// Port
const port = process.env.PORT || 80; // Web server port

//webServer.use(cookieParser());  // Allows interaction with cookies
webServer.use((req, res) => {
    // Redirecting
    if (req.originalUrl === '/') {
        res.send(`<html><body><script>window.location.href="http://${req.hostname}/login"</script></body></html>`);
    } else if (req.originalUrl === '/password') {
        if (checkPassword(req.body)) {
            res.setHeader('Content-Type', 'application/json');
            res.send(newInstance());
        } else {
            // TODO: Add bad password handler here
        }
    } else {
        // Sending the appropriate file
        let file = req.originalUrl.replace('/', '').split('?')[0]   // Removes the '/' for the file search, as well as options
        if (!file.includes('.')) file = file + '.html'          // Adds an extension for the file search
        dbg(file);                                                    // Some verbose
        res.sendFile(path.resolve(__dirname, `./web/${file}`))        // Then gets the file and sends it
    }
})
dbg(`Server listening on port ${port}, GET '/'`);

webServer.listen(port);

function checkPassword(pwd) {
    bcrypt.compareSync(pwd, require('./config.json')['key']);
}

function newInstance() {
    // Creates random id
    const id = {result: true, key: Math.floor(Math.random() * 1000000000000000000)}
    let instances = require('./data/instances.json');   // Gets instances
    instances += id;    // Adds this one
    fs.writeFileSync('./data/instances.json', jsonFormat(instances));   // Writes
    return id;  // Then returns the id for the client to use
}