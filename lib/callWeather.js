const axios = require('axios');
const dbg = require('debug')('loriol').extend('weather-call');
const fs = require('fs');
const jsonFormat = require('json-format');

module.exports = { weather, weatherForecast };

function weather(db) {
    const apiKey = require('../config.json')['weatherKey'];
    if (apiKey === undefined) {
        throw 'Please provide a valid "weatherKey" string in the config.json file. This is required.';
    }

    // Current time
    const call_addr = `https://api.openweathermap.org/data/2.5/weather?units=metric&lang=fr&q=Loriol-sur-Dr%C3%B4me,26270,France&appid=${apiKey}`;
    axios({method: "GET", url: call_addr})
        .then(res => {
            fs.writeFileSync('./weather_log.json', jsonFormat(res['data']), {encoding: 'utf-8'});
            // Putting values in variables
            const temp = res['data']['main']['temp'],
                temp_feels = res['data']['main']['feels_like'],
                pressure = res['data']['main']['pressure'],
                humidity = res['data']['main']['humidity'],
                weatherId = res['data']['weather'][0]['id'],
                windSpeed = res['data']['wind']['speed'],
                windDeg = res['data']['wind']['deg'],
                clouds = res['data']['clouds']['all'],
                sunrise = res['data']['sys']['sunrise'],
                sunset = res['data']['sys']['sunset']
            let query; // Making a MySQL query string
            if (res['data'].hasOwnProperty('rain')) {
                // If it's raining
                const rain = res['data']['rain']['1h'];
                // Set query with rain
                query = `INSERT INTO weather (temp, temp_feels, pressure, humidity, weatherid, windspeed, winddeg, clouds, rain, sunrise, sunset) VALUES (${temp}, ${temp_feels}, ${pressure}, ${humidity}, ${weatherId}, ${windSpeed}, ${windDeg}, ${clouds}, ${rain}, ${sunrise}, ${sunset})`;
            } else {
                // Else set query without rain
                query = `INSERT INTO weather (temp, temp_feels, pressure, humidity, weatherid, windspeed, winddeg, clouds, sunrise, sunset) VALUES (${temp}, ${temp_feels}, ${pressure}, ${humidity}, ${weatherId}, ${windSpeed}, ${windDeg}, ${clouds}, FROM_UNIXTIME(${sunrise}), FROM_UNIXTIME(${sunset}))`;
            }
            db.query(query, (err) => { // Sends the data to the DB
                if (err) dbg(err);
            });
        })
        .catch(err => {
            if (err.message === 'Request failed with status code 401') {
                dbg('Invalid or unauthorized OpenWeather API credentials');
            } else {
                console.log(err);
            }
        })
}

function weatherForecast(db) {
    // TODO
}

// Database reference:
// Database table "weather"
// +------------+-------------+------+-----+---------------------+-------+
// | Field      | Type        | Null | Key | Default             | Extra |
// +------------+-------------+------+-----+---------------------+-------+
// | temp       | float       | YES  |     | NULL                |       |
// | temp_feels | float       | YES  |     | NULL                |       |
// | pressure   | smallint(6) | YES  |     | NULL                |       |
// | humidity   | smallint(6) | YES  |     | NULL                |       |
// | weatherid  | tinyint(4)  | YES  |     | NULL                |       |
// | windspeed  | float       | YES  |     | NULL                |       |
// | winddeg    | tinyint(4)  | YES  |     | NULL                |       |
// | clouds     | tinyint(4)  | YES  |     | NULL                |       |
// | rain       | smallint(6) | YES  |     | NULL                |       |
// | sunrise    | timestamp   | NO   |     | 0000-00-00 00:00:00 |       |
// | sunset     | timestamp   | NO   |     | 0000-00-00 00:00:00 |       |
// | timestamp  | timestamp   | NO   |     | current_timestamp() |       |
// +------------+-------------+------+-----+---------------------+-------+
// Database table "weather_forecast"
// +--------------------+-------------+------+-----+---------------------+-------+
// | Field              | Type        | Null | Key | Default             | Extra |
// +--------------------+-------------+------+-----+---------------------+-------+
// | temp               | float       | YES  |     | NULL                |       |
// | temp_feels         | float       | YES  |     | NULL                |       |
// | pressure           | smallint(6) | YES  |     | NULL                |       |
// | humidity           | smallint(6) | YES  |     | NULL                |       |
// | weatherId          | tinyint(4)  | YES  |     | NULL                |       |
// | windspeed          | float       | YES  |     | NULL                |       |
// | winddeg            | tinyint(4)  | YES  |     | NULL                |       |
// | clouds             | tinyint(4)  | YES  |     | NULL                |       |
// | rain               | smallint(6) | YES  |     | NULL                |       |
// | sunrise            | timestamp   | NO   |     | 0000-00-00 00:00:00 |       |
// | sunset             | timestamp   | NO   |     | 0000-00-00 00:00:00 |       |
// | timestamp          | timestamp   | NO   |     | current_timestamp() |       |
// | timestamp_forecast | timestamp   | NO   |     | 0000-00-00 00:00:00 |       |
// +--------------------+-------------+------+-----+---------------------+-------+