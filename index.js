#!/usr/bin/env node
// index.js
// Entry point

// Imports
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser')   // Cookie support for express
const debug = require('debug');
const dbg = debug('loriol').extend('web');
const express = require('express');
const fs = require('fs');
const jsonFormat = require('json-format')
const path = require('path');
require('supports-color');      // Color support for 'debug'

// Declarations
const jsonParser = bodyParser.json()    // Json request body parser
const webServer = express();    // HTTP Server
require('./lib/init');          // Initialization task
require('./dataAPI');           // REST API

// Port
const port = process.env.PORT || 80; // Web server port

//webServer.use(cookieParser());  // Allows interaction with cookies
webServer.use(bodyParser.json, (req, res) => {
    // Redirecting
    if (req.originalUrl === '/') {
        res.send(`<html><body><script>window.location.href="http://${req.hostname}/login"</script></body></html>`);
    } else if (req.originalUrl === '/password') {
        console.log(req);
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
        file = './web/' + file;
        const filePath = path.resolve(__dirname, file)
        dbg(filePath);                                                    // Some verbose
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath)      // Then gets the file and sends it
        } else {
            res.sendStatus(404);  // Sends 404i
        }
    }
})
dbg(`Server listening on port ${port}, GET '/'`);

// Server starts
webServer.listen(port);

// Checks if the password is corresponding to the hash
function checkPassword(pwd) {
    bcrypt.compareSync(pwd, require('./config.json')['key']);
}

// Makes a new instance and store it
function newInstance() {
    // Creates random id
    const id = {result: true, key: Math.floor(Math.random() * 1000000000000000000)}
    let instances = require('./data/instances.json');   // Gets instances
    instances += id;    // Adds this one
    fs.writeFileSync('./data/instances.json', jsonFormat(instances));   // Writes
    return id;  // Then returns the id for the client to use
}