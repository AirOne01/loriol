#!/usr/bin/env node
// Tasks being executed periodically (periodic.js)

// Imports
const axios = require('axios');
const CronJob = require('cron').CronJob;
const dbg = require('debug')('loriol').extend('periodic');
const mysql = require('mysql');

// Options
const opts = require('../config.json');

const db = mysql.createConnection({
    host: opts['database']['host'],
    user: opts['database']['user'],
    password: opts['database']['password'],
    database: opts['database']['database']
});

// Registers a cron job for given time operator.
// See https://www.freeformatter.com/cron-expression-generator-quartz.html for a sweet cron time creator (replace "?" by "*")
// 0 */5 * * * *
const temperatureJob = new CronJob('0 */5 * * * *', () => {
    axios({
        method: "GET",
        url: opts["sensorIp"]
    })
        .then(res => {
            db.query(`INSERT INTO sounds1 (level, timestamp) VALUES (${res.data["sound1"]}, ${Date.now()});`, (err) => {
                if (err) throw err;
            });
            db.query(`INSERT INTO sounds2 (level, timestamp) VALUES (${res.data["sound2"]}, ${Date.now()});`, (err) => {
                if (err) throw err;
            });
            db.query(`INSERT INTO sounds3 (level, timestamp) VALUES (${res.data["sound3"]}, ${Date.now()});`, (err) => {
                if (err) throw err;
            });
        })
        .catch(err => {
            if (err.message === 'Cannot read property \'replace\' of null') {
                dbg(`Couldn't contact sensor server at ${opts['sensorIp']}`);
            } else {
                dbg(err);
            }
        })
}, null, true, 'Europe/Paris');

// Starts the job
temperatureJob.start();