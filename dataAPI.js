// dataAPI.js
// All there is regarding the sound API

// Imports
const axios = require('axios');
const dbg = require('debug')('loriol').extend('api');
const express = require('express');

// Declarations
const dataAPI = express();

// Port
const port = process.env.PORT+1 || 81;        // API port (need to be different from the webserver port)

// Debug
const dbgS = dbg.extend('state');   // State debug
const dbgG = dbg.extend('get');     // Get debug
const dbgP = dbg.extend('post');    // Post debug

// API state
dataAPI.get('/api/v1/state', (req, res) => {
    dbg(`Request from ${req.ip}`);
    res.setHeader('Content-Type', 'text/plain');
    res.send('alive');
})
dbgS(`Server listening on port ${port}, GET '/api/v1/state'`);

// API 'GET'
dataAPI.get('/api/v1', (req, res) => {
    dbg(`Request from ${req.ip}`);
})
dbgG(`Server listening on port ${port}, GET '/api/v1'`);

// API 'POST'
dataAPI.post('/api/v1/', (req, res) => {
    dbg(`Request from ${req.ip}`);
});
dbgP(`Server listening on port ${port}, POST '/api/v1'`);

dataAPI.listen(port);