// init.js
// Called upon initializing the program (init.js)

// Imports
const bcrypt = require('bcryptjs');
const dbg = require('debug')('loriol').extend('init');
const fs = require('fs');
const jsonFormat = require('json-format');
// Gets the config from the file
const cfg = require('../config.json');

// Static program
const argv = process.argv;
if (argv.includes('--help') || argv.includes('-h')) {   // If asked for help
    console.log("Syntax: index.js <option>\n--help       Shows this menu\n--password   Sets the password")
    process.exit(0);             // Stops
} else if (argv.includes('--password')) {   // If asked for password reset
    getPwd(true);           // Changes password
} else if (!cfg.hasOwnProperty('key')) {    // If no password
    getPwd(false);          // Change password then continue
}

// Ask the user for a password
function getPwd(stop) {
    if (!cfg.hasOwnProperty('password')) {
        // TODO: Change this to not throw
        throw 'Pas de mot de passe spécifié dans config.json'
    } else {
        const pwd = cfg.password;   // Gets the raw password
        delete cfg.password;        // Removes the password from the config
        writeKey(pwd);
        if (stop) process.exit(0);  // Then stops if needed
    }
}

// Write a hash with the password as the bacon
function writeKey(pwd) {
    const hash = bcrypt.hashSync(pwd, 8);  // Generates hash from salt and bacon (password) and adds it to config
    cfg['key'] = hash;
    fs.writeFile('config.json', jsonFormat(cfg), (err) => {
        if (err) throw err;
        console.log(hash);
        dbg(`Added password to configuration file`);
    });
}

module.exports = function (db) {
    db.connect(err => {
        if (err) throw err;
        // TODO: This is not actually good, since nothing happens there
    })
}