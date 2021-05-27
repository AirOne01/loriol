const fs = require('fs');
const path = require('path');

module.exports = function (db, id, callback) {
    let form = fs.readFileSync(path.resolve(__dirname, '../web/dashboard.html'), "utf-8");

    //const query = `SELECT FROM (level, timestamp) VALUES (${res.data["sound1"]}, ${Date.now()});`;
    let sound1, sound2, sound3, weather, instances;
    db.query(`SELECT level, timestamp FROM sound1`, (err, res) => {
        if (err) throw err;
        sound1 = res;
        db.query(`SELECT level, timestamp FROM sound2`, (err, res) => {
            if (err) throw err;
            sound2 = res;
            db.query(`SELECT level, timestamp FROM sound3`, (err, res) => {
                if (err) throw err;
                sound3 = res;
                db.query(`SELECT temp, temp_feels, pressure, humidity, weatherid, windspeed, winddeg, clouds, rain, UNIX_TIMESTAMP(sunrise), UNIX_TIMESTAMP(sunset), UNIX_TIMESTAMP(timestamp), timestamp FROM weather`, (err, res) => {
                    if (err) throw err;
                    weather = res;
                    db.query(`SELECT id, origin, UNIX_TIMESTAMP(timestamp) FROM instances WHERE (id=${id})`, (err, res) => {
                        if (err) throw err;
                        instances = res;

                        // Sound date (for the table titles)
                        const sound1_0_date = new Date(sound1[sound1.length - 1]['timestamp']);
                        const sound1_1_date = new Date(sound1[sound1.length - 2]['timestamp']);
                        const sound1_2_date = new Date(sound1[sound1.length - 3]['timestamp']);
                        const sound1_3_date = new Date(sound1[sound1.length - 4]['timestamp']);
                        const sound1_4_date = new Date(sound1[sound1.length - 5]['timestamp']);
                        const sound1_5_date = new Date(sound1[sound1.length - 6]['timestamp']);
                        const sound1_6_date = new Date(sound1[sound1.length - 7]['timestamp']);

                        // Weather date (for the table titles)
                        const weather_0_date = new Date(weather[weather.length - 1]['timestamp']);
                        const weather_1_date = new Date(weather[weather.length - 2]['timestamp']);
                        const weather_2_date = new Date(weather[weather.length - 3]['timestamp']);
                        const weather_3_date = new Date(weather[weather.length - 4]['timestamp']);
                        const weather_4_date = new Date(weather[weather.length - 5]['timestamp']);
                        const weather_5_date = new Date(weather[weather.length - 6]['timestamp']);
                        const weather_6_date = new Date(weather[weather.length - 7]['timestamp']);

                        // Changes the page
                        form = form
                            /// Informations (top-right)
                            .replace('#connectionId#', instances[0]['id'])
                            .replace('#connectionOrigin#', instances[0]['origin'])
                            .replace('#connectionTimestamp#', instances[0]['UNIX_TIMESTAMP(timestamp)'])
                            /// Sound table
                            // Titre
                            //.replace('#title_d#', getDay(new Date(weather[weather.length-1]['timestamp']).getDay()-1) + ' ' + new Date(weather[weather.length-1]['timestamp']).getDate())
                            //.replace('#title_d#', getDay(today.getDay()-1) + ' ' + today.getDate() + '/' + today.getMonth())
                            .replace('#Stitle_d#', `${getDay(sound1_0_date.getDay())} ${sound1_0_date.getDay()}/${sound1_0_date.getMonth() + 1} ${sound1_0_date.getHours()}:${sound1_0_date.getMinutes()}`)
                            .replace('#Stitle_d-1#', `${getDay(sound1_1_date.getDay())} ${sound1_1_date.getDay()}/${sound1_1_date.getMonth() + 1} ${sound1_1_date.getHours()}:${sound1_1_date.getMinutes()}`)
                            .replace('#Stitle_d-2#', `${getDay(sound1_2_date.getDay())} ${sound1_2_date.getDay()}/${sound1_2_date.getMonth() + 1} ${sound1_2_date.getHours()}:${sound1_2_date.getMinutes()}`)
                            .replace('#Stitle_d-3#', `${getDay(sound1_3_date.getDay())} ${sound1_3_date.getDay()}/${sound1_3_date.getMonth() + 1} ${sound1_3_date.getHours()}:${sound1_3_date.getMinutes()}`)
                            .replace('#Stitle_d-4#', `${getDay(sound1_4_date.getDay())} ${sound1_4_date.getDay()}/${sound1_4_date.getMonth() + 1} ${sound1_4_date.getHours()}:${sound1_4_date.getMinutes()}`)
                            .replace('#Stitle_d-5#', `${getDay(sound1_5_date.getDay())} ${sound1_5_date.getDay()}/${sound1_5_date.getMonth() + 1} ${sound1_5_date.getHours()}:${sound1_5_date.getMinutes()}`)
                            .replace('#Stitle_d-6#', `${getDay(sound1_6_date.getDay())} ${sound1_6_date.getDay()}/${sound1_6_date.getMonth() + 1} ${sound1_6_date.getHours()}:${sound1_6_date.getMinutes()}`)
                            // Capteur 1
                            .replace('#value_d_1#', sound1[sound1.length - 1]['level'])
                            .replace('#value_d-1_1#', sound1[sound1.length - 2]['level'])
                            .replace('#value_d-2_1#', sound1[sound1.length - 3]['level'])
                            .replace('#value_d-3_1#', sound1[sound1.length - 4]['level'])
                            .replace('#value_d-4_1#', sound1[sound1.length - 5]['level'])
                            .replace('#value_d-5_1#', sound1[sound1.length - 6]['level'])
                            .replace('#value_d-6_1#', sound1[sound1.length - 7]['level'])
                            // Capteur 2
                            .replace('#value_d_2#', sound2[sound2.length - 1]['level'])
                            .replace('#value_d-1_2#', sound2[sound2.length - 2]['level'])
                            .replace('#value_d-2_2#', sound2[sound2.length - 3]['level'])
                            .replace('#value_d-3_2#', sound2[sound2.length - 4]['level'])
                            .replace('#value_d-4_2#', sound2[sound2.length - 5]['level'])
                            .replace('#value_d-5_2#', sound2[sound2.length - 6]['level'])
                            .replace('#value_d-6_2#', sound2[sound2.length - 7]['level'])
                            // Capteur 3
                            .replace('#value_d_3#', sound3[sound3.length - 1]['level'])
                            .replace('#value_d-1_3#', sound3[sound3.length - 2]['level'])
                            .replace('#value_d-2_3#', sound3[sound3.length - 3]['level'])
                            .replace('#value_d-3_3#', sound3[sound3.length - 4]['level'])
                            .replace('#value_d-4_3#', sound3[sound3.length - 5]['level'])
                            .replace('#value_d-5_3#', sound3[sound3.length - 6]['level'])
                            .replace('#value_d-6_3#', sound3[sound3.length - 7]['level'])
                            /// Weather table
                            .replace('#Wtitle_d#', `${getDay(weather_0_date.getDay())} ${weather_0_date.getDay()}/${weather_0_date.getMonth() + 1} ${weather_0_date.getHours()}:${weather_0_date.getMinutes()}`)
                            .replace('#Wtitle_d-1#', `${getDay(weather_1_date.getDay())} ${weather_1_date.getDay()}/${weather_1_date.getMonth() + 1} ${weather_1_date.getHours()}:${weather_1_date.getMinutes()}`)
                            .replace('#Wtitle_d-2#', `${getDay(weather_2_date.getDay())} ${weather_2_date.getDay()}/${weather_2_date.getMonth() + 1} ${weather_2_date.getHours()}:${weather_2_date.getMinutes()}`)
                            .replace('#Wtitle_d-3#', `${getDay(weather_3_date.getDay())} ${weather_3_date.getDay()}/${weather_3_date.getMonth() + 1} ${weather_3_date.getHours()}:${weather_3_date.getMinutes()}`)
                            .replace('#Wtitle_d-4#', `${getDay(weather_4_date.getDay())} ${weather_4_date.getDay()}/${weather_4_date.getMonth() + 1} ${weather_4_date.getHours()}:${weather_4_date.getMinutes()}`)
                            .replace('#Wtitle_d-5#', `${getDay(weather_5_date.getDay())} ${weather_5_date.getDay()}/${weather_5_date.getMonth() + 1} ${weather_5_date.getHours()}:${weather_5_date.getMinutes()}`)
                            .replace('#Wtitle_d-6#', `${getDay(weather_6_date.getDay())} ${weather_6_date.getDay()}/${weather_6_date.getMonth() + 1} ${weather_6_date.getHours()}:${weather_6_date.getMinutes()}`)
                            // Wind
                            .replace('#value_d_wind#', weather[weather.length - 1]['windspeed'] + ' m/s')
                            .replace('#value_d-1_wind#', weather[weather.length - 2]['windspeed'] + ' m/s')
                            .replace('#value_d-2_wind#', weather[weather.length - 3]['windspeed'] + ' m/s')
                            .replace('#value_d-3_wind#', weather[weather.length - 4]['windspeed'] + ' m/s')
                            .replace('#value_d-4_wind#', weather[weather.length - 5]['windspeed'] + ' m/s')
                            .replace('#value_d-5_wind#', weather[weather.length - 6]['windspeed'] + ' m/s')
                            .replace('#value_d-6_wind#', weather[weather.length - 7]['windspeed'] + ' m/s')
                            // Weather condition
                            .replace('#value_d_weather#', getWeather(weather[weather.length - 1]['weatherid']))
                            .replace('#value_d-1_weather#', getWeather(weather[weather.length - 2]['weatherid']))
                            .replace('#value_d-2_weather#', getWeather(weather[weather.length - 3]['weatherid']))
                            .replace('#value_d-3_weather#', getWeather(weather[weather.length - 4]['weatherid']))
                            .replace('#value_d-4_weather#', getWeather(weather[weather.length - 5]['weatherid']))
                            .replace('#value_d-5_weather#', getWeather(weather[weather.length - 6]['weatherid']))
                            .replace('#value_d-6_weather#', getWeather(weather[weather.length - 7]['weatherid']))
                            // Temperature
                            .replace('#value_d_temp#', weather[weather.length - 1]['temp'])
                            .replace('#value_d-1_temp#', weather[weather.length - 2]['temp'])
                            .replace('#value_d-2_temp#', weather[weather.length - 3]['temp'])
                            .replace('#value_d-3_temp#', weather[weather.length - 4]['temp'])
                            .replace('#value_d-4_temp#', weather[weather.length - 5]['temp'])
                            .replace('#value_d-5_temp#', weather[weather.length - 6]['temp'])
                            .replace('#value_d-6_temp#', weather[weather.length - 7]['temp'])
                            // Temperature
                            .replace('#value_d_clouds#', weather[weather.length - 1]['clouds'] + '%')
                            .replace('#value_d-1_clouds#', weather[weather.length - 2]['clouds'] + '%')
                            .replace('#value_d-2_clouds#', weather[weather.length - 3]['clouds'] + '%')
                            .replace('#value_d-3_clouds#', weather[weather.length - 4]['clouds'] + '%')
                            .replace('#value_d-4_clouds#', weather[weather.length - 5]['clouds'] + '%')
                            .replace('#value_d-5_clouds#', weather[weather.length - 6]['clouds'] + '%')
                            .replace('#value_d-6_clouds#', weather[weather.length - 7]['clouds'] + '%')

                        // returns the value
                        callback(form);
                    });
                });
            });
        });
    });
}

function getDay(day) {
    switch (day) {
        case 0: {
            return 'Lundi';
        }
        case 1: {
            return 'Mardi';
        }
        case 2: {
            return 'Mercredi';
        }
        case 3: {
            return 'Jeudi';
        }
        case 4: {
            return 'Vendredi';
        }
        case 5: {
            return 'Samedi';
        }
        case -1: {
            return 'Dimanche';
        }
        default: {
            return day;
        }
    }
}

function getWeather(id) {
    // More info at https://openweathermap.org/weather-conditions
    // Special weather parsing
    if (id <= 232 && id >= 200) id = 200;   // Thunderstorm
    if (id <= 321 && id >= 300) id = 300;   // Drizzle
    if (id <= 531 && id >= 500) id = 500;   // Rain
    if (id <= 622 && id >= 600) id = 600;   // Snow
    switch (id) {
        // Thunderstorm (2xx)
        case 200:
            return 'Orage';
        // Drizzle (300)
        case 300:
            return 'Bruine'
        // Rain (500)
        case 500:
            return 'Pluie';
        // Snow (600)
        case 600:
            return 'Neige';
        // Clear (800)
        case 800:
            return 'Dégagé';
        // Clouds (80x)
        case 801:
            return 'Quelques nuages'
        case 802:
            return 'Nuages dispersés';
        case 803:
            return 'Nuagé';
        case 804:
            return 'Très nuagé';
        default:
            return 'Météo inconnue';
    }
}