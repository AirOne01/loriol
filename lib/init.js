// init.js
// Called upon initializing the program

// Imports
const dbg = require('debug')('loriol').extend('init');
const Chance = require('chance');
const chance = new Chance(Date.now());
const fs = require('fs');
const jsonFormat = require('json-format');

const cfg = require('../config.json');

// Checking for a key; if none, generate
if (!cfg.hasOwnProperty('key')) {
    const key = chance.guid()
    cfg['key'] = key;     // Adds a key as a GUID

    fs.writeFile('config.json', jsonFormat(cfg), (err) => {
        if (err) throw err;
        dbg(`Added key '${key}' to configuration file`);
    });
}