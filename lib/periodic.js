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

let sensorOn;

// Testing the connection to the Arduino server
axios({
    method: "GET",
    url: opts["sensorIp"]
})
    .then(() => {
        dbg('Successfully connected to the Arduino sensor server');
        dbg('Starting periodic job of data retrieving from the sensor server');
        sensorOn = true;
    })
    .catch(err => {
        dbg('⬇⬇⬇ Arduino sensor server error');
        dbg(err);
        dbg('⬆⬆⬆ This is probably because the sensor server is offline or the config is incorrect');
        dbg('Thus, canceling periodic calls of sensor server');
        sensorOn = false;
    })

if (sensorOn) {
    // Registers a cron job for given time operator.
    // See https://www.freeformatter.com/cron-expression-generator-quartz.html for a sweet cron time creator (replace "?" by "*")
    // 0 */5 * * * *
    const temperatureJob = new CronJob('0 */30 * * * *', () => {
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
                dbg('⬇⬇⬇ Arduino sensor server error');
                dbg(err);
                dbg('⬆⬆⬆ This may be due to the fact that the Arduino sensor server is offline or that its IP is incorrect');
            })
    }, null, true, 'Europe/Paris');

    // Starts the jobs
    temperatureJob.start();
}

const weatherJob = new CronJob('0 */30 * * * *', () => {
    require('./callWeather')['weather'](db);    // Calls the weather api
})

weatherJob.start();