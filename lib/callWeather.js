const axios = require('axios');
const fs = require('fs');
const jsonFormat = require('json-format');

module.exports = function () {
    const apiKey = require('../config.json')['weatherKey'];
    const call_addr = `https://api.openweathermap.org/data/2.5/weather?q=Loriol-sur-Dr%C3%B4me,26270,France&appid=${apiKey}`;
    axios({method:"GET",url:call_addr})
        .then(res => {
            fs.writeFileSync('./weather.json', jsonFormat(res['data']), {eoncoding: 'utf-8'});
        })
        .catch(err => {
            console.log(err);
        })
}