#!/usr/bin/env node
// Entry point (index.js)

/**
 * @type {Knex}
 */

// Imports
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser')   // Cookie support for express
const debug = require('debug');
const dbg = debug('loriol').extend('http');
const express = require('express');
const fs = require('fs');
const jsonFormat = require('json-format');
const mysql = require('mysql');
const path = require('path');
require('supports-color');      // Color support for 'debug'

// Declarations
const jsonParser = bodyParser.json();   // Json request body parser
const webServer = express();    // HTTP Server
require('./lib/init');          // Initialization task
require('./dataAPI');           // REST API

// Port
const port = process.env.PORT || 80; // Web server port

// Static options
const opts = require('./config.json');

webServer.use(jsonParser);
webServer.use((req, res) => {
    // Redirecting
    if (req.originalUrl === '/') {
        res.send(`<html lang="en"><body><script>window.location.href="http://${req.hostname}/login"</script></body></html>`);
    } else if (req.originalUrl === '/password') {
        if (checkPassword(req.body["password"])) {
            const date = new Date(Date.now());
            dbg(`${req.ip} connected at ${Date.now()} (${date.getMonth() + 1}/${date.getDay()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}''${date.getSeconds()})`);
            // ^ Adding one to the month because month convention is -1 by default (starting with zero)

            const id = Math.floor(Math.random() * 1000000000000000000); // Creates random id

            // Adds instance to db
            newInstance(req.ip, id)
            // Sends response
            res.setHeader('Content-Type', 'application/json');
            res.send(`{"key":"${id}"}`);
            dbg(`Successfully pushed instances for ${req.ip} to database`);
        } else {
            // TODO: Add bad password handler (client-side) here
            res.sendStatus(401);
            const date = new Date(Date.now());
            dbg(`${req.ip} tried a wrong password at ${Date.now()} (${date.getMonth() + 1}/${date.getDay()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}''${date.getSeconds()})`);
        }
    } else {
        // Sending the appropriate file
        let file = req.originalUrl.replace('/', '').split('?')[0]   // Removes the '/' for the file search, as well as options
        if (!file.includes('.')) file = file + '.html'  // Adds an extension for the file search
        file = './web/' + file;
        const filePath = path.resolve(__dirname, file);
        dbg(filePath);  // Some verbose
        if (fs.existsSync(filePath)) {
            res.sendFile(filePath); // Then gets the file and sends it
        } else {
            res.sendStatus(404);    // Sends 404
        }
    }
})
dbg(`Server listening on port ${port}, '/'`);

// Server starts
webServer.listen(port);

console.log(opts['database']['host'] + ' ' + opts['database']['user'] + ' ' + opts['database']['password'] + ' ' + opts['database']['database'])

// Database declaration
db = mysql.createConnection({
    host: opts['database']['host'],
    user: opts['database']['user'],
    password: opts['database']['password'],
    database: opts['database']['database']
});
db.connect(err => {
    if (err) throw err;
    db.query(`SELECT * FROM instances`, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
    });
})

// Checks if the password is corresponds with the hash
function checkPassword(pwd) {
    return bcrypt.compareSync(pwd, require('./config.json')['key']);
}

// Makes a new instance and store it
function newInstance(ip, id) {
    /* Old database program
    const data = fs.readFileSync('./data/instances.json', 'utf8');  // Gets data
    const obj = JSON.parse(data);   // Gets instances file as obj
    obj['table'].push({"id": id, "timestamp": Date.now(), "origin": ip});   // Adds it as an object with timestamp
    fs.writeFileSync('./data/instances.json', jsonFormat(obj)); // Writes
     */

    db.connect(err => {
        if (err) throw err;
        // Pushes to the database
        db.query(`INSERT INTO instances (id, timestamp, origin) VALUES (${id}, ${Date.now()}, ${ip})`, (err, result) => {
            if (err) throw err;
            console.log('Insert result: ' + result);
        })
    });
    db.end();
}