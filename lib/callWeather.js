const axios = require('axios');
const fs = require('fs');
const jsonFormat = require('json-format');

module.exports = function (db) {
    const apiKey = require('../config.json')['weatherKey'];
    const call_addr = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=Loriol-sur-Dr%C3%B4me,26270,France&appid=${apiKey}`;
    axios({method:"GET",url:call_addr})
        .then(res => {
            fs.writeFileSync('./weather.json', jsonFormat(res['data']), {encoding: 'utf-8'});
            const temp = res['data']['main']['temp'],
                temp_feels = res['data']['main']['feels_like'],
                pressure = res['data']['main']['pressure'],
                humidity = res['data']['main']['humidity'],
                weatherId = res['data']['weather'][0]['id'],
                windSpeed = res['data']['wind']['speed'],
                windDeg = res['data']['wind']['deg'],
                clouds = res['data']['clouds']['all'],
                rain = res['data']['rain']['1h'],
                sunrise = res['data']['sys']['sunrise'],
                sunset = res['data']['sys']['sunset']
            db.query(`INSERT INTO instances (id, timestamp, origin) VALUES (");`, (err, result) => {
                // Database table "weather"
                // +------------+-------------+------+-----+---------------------+-------+
                // | Field      | Type        | Null | Key | Default             | Extra |
                // +------------+-------------+------+-----+---------------------+-------+
                // | temp       | float       | YES  |     | NULL                |       |
                // | temp_feels | float       | YES  |     | NULL                |       |
                // | pressure   | smallint(6) | YES  |     | NULL                |       |
                // | humidity   | smallint(6) | YES  |     | NULL                |       |
                // | weatherId  | tinyint(4)  | YES  |     | NULL                |       |
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
            });
        })
        .catch(err => {
            console.log(err);
        })
}