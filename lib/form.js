const fs = require('fs');
const path = require('path');

module.exports = function (db, id, callback) {
    let form = fs.readFileSync(path.resolve(__dirname, '../web/dashboard.html'), "utf-8");

    //const query = `SELECT FROM (level, timestamp) VALUES (${res.data["sound1"]}, ${Date.now()});`;
    let sound1, sound2, sound3, weather, instances;
    db.query(`SELECT level, timestamp, UNIX_TIMESTAMP(timestamp) FROM sound1`, (err, res) => {
        if (err) throw err;
        sound1 = res;
        db.query(`SELECT level, timestamp, UNIX_TIMESTAMP(timestamp) FROM sound2`, (err, res) => {
            if (err) throw err;
            sound2 = res;
            db.query(`SELECT level, timestamp, UNIX_TIMESTAMP(timestamp) FROM sound3`, (err, res) => {
                if (err) throw err;
                sound3 = res;
                db.query(`SELECT temp, temp_feels, pressure, humidity, weatherid, windspeed, winddeg, clouds, rain, UNIX_TIMESTAMP(sunrise), UNIX_TIMESTAMP(sunset), UNIX_TIMESTAMP(timestamp), timestamp FROM weather`, (err, res) => {
                    if (err) throw err;
                    weather = res;
                    db.query(`SELECT id, origin, UNIX_TIMESTAMP(timestamp) FROM instances WHERE (id=${id})`, (err, res) => {
                        if (err) throw err;
                        instances = res;
                        // All dates
                        const today = new Date();
                        console.log(today.getTime())
                        const before_1 = new Date(new Date().setDate(new Date().getDate() - 1));
                        console.log(before_1.getTime())
                        const before_2 = new Date(new Date().setDate(new Date().getDate() - 2));
                        console.log(before_2.getTime())
                        const before_3 = new Date(new Date().setDate(new Date().getDate() - 3));
                        console.log(before_3.getTime())
                        const before_4 = new Date(new Date().setDate(new Date().getDate() - 4));
                        console.log(before_4.getTime())
                        const before_5 = new Date(new Date().setDate(new Date().getDate() - 5));
                        console.log(before_5.getTime())
                        const before_6 = new Date(new Date().setDate(new Date().getDate() - 6));
                        console.log(before_6.getTime())
                        // Weather
                        let rs_today, rs_before_1, rs_before_2, rs_before_3, rs_before_4, rs_before_5, rs_before_6;
                        weather.forEach(el => {
                            if (el['UNIX_TIMESTAMP(timestamp)'] > today.getTime() - 86400 || el['UNIX_TIMESTAMP(timestamp)'] < today.getTime() + 86400) rs_today = el;
                            if (el['UNIX_TIMESTAMP(timestamp)'] > before_1.getTime() - 86400 || el['UNIX_TIMESTAMP(timestamp)'] < before_1.getTime() + 86400) rs_before_1 = el;
                            if (el['UNIX_TIMESTAMP(timestamp)'] > before_2.getTime() - 86400 || el['UNIX_TIMESTAMP(timestamp)'] < before_2.getTime() + 86400) rs_before_2 = el;
                            if (el['UNIX_TIMESTAMP(timestamp)'] > before_3.getTime() - 86400 || el['UNIX_TIMESTAMP(timestamp)'] < before_3.getTime() + 86400) rs_before_3 = el;
                            if (el['UNIX_TIMESTAMP(timestamp)'] > before_4.getTime() - 86400 || el['UNIX_TIMESTAMP(timestamp)'] < before_4.getTime() + 86400) rs_before_4 = el;
                            if (el['UNIX_TIMESTAMP(timestamp)'] > before_5.getTime() - 86400 || el['UNIX_TIMESTAMP(timestamp)'] < before_5.getTime() + 86400) rs_before_5 = el;
                            if (el['UNIX_TIMESTAMP(timestamp)'] > before_6.getTime() - 86400 || el['UNIX_TIMESTAMP(timestamp)'] < before_6.getTime() + 86400) rs_before_6 = el;
                        })
                        if (rs_today === undefined) rs_today = '❌';
                        if (rs_before_1 === undefined) rs_before_1 = '❌';
                        if (rs_before_2 === undefined) rs_before_2 = '❌';
                        if (rs_before_3 === undefined) rs_before_3 = '❌';
                        if (rs_before_4 === undefined) rs_before_4 = '❌';
                        if (rs_before_5 === undefined) rs_before_5 = '❌';
                        if (rs_before_6 === undefined) rs_before_6 = '❌';
                        // Sound1
                        let sd1_today, sd1_before_1, sd1_before_2, sd1_before_3, sd1_before_4, sd1_before_5, sd1_before_6;
                        sound1.forEach(el => {
                            if (el['UNIX_TIMESTAMP(timestamp)'] > today.getTime() - 86400 || el['UNIX_TIMESTAMP(timestamp)'] < today.getTime() + 86400) sd1_today = el;
                            if (el['UNIX_TIMESTAMP(timestamp)'] > before_1.getTime() - 86400 || el['UNIX_TIMESTAMP(timestamp)'] < before_1.getTime() + 86400) sd1_before_1 = el;
                            if (el['UNIX_TIMESTAMP(timestamp)'] > before_2.getTime() - 86400 || el['UNIX_TIMESTAMP(timestamp)'] < before_2.getTime() + 86400) sd1_before_2 = el;
                            if (el['UNIX_TIMESTAMP(timestamp)'] > before_3.getTime() - 86400 || el['UNIX_TIMESTAMP(timestamp)'] < before_3.getTime() + 86400) sd1_before_3 = el;
                            if (el['UNIX_TIMESTAMP(timestamp)'] > before_4.getTime() - 86400 || el['UNIX_TIMESTAMP(timestamp)'] < before_4.getTime() + 86400) sd1_before_4 = el;
                            if (el['UNIX_TIMESTAMP(timestamp)'] > before_5.getTime() - 86400 || el['UNIX_TIMESTAMP(timestamp)'] < before_5.getTime() + 86400) sd1_before_5 = el;
                            if (el['UNIX_TIMESTAMP(timestamp)'] > before_6.getTime() - 86400 || el['UNIX_TIMESTAMP(timestamp)'] < before_6.getTime() + 86400) sd1_before_6 = el;
                        })
                        if (sd1_today === undefined) sd1_today = '❌';
                        if (sd1_before_1 === undefined) sd1_before_1 = '❌';
                        if (sd1_before_2 === undefined) sd1_before_2 = '❌';
                        if (sd1_before_3 === undefined) sd1_before_3 = '❌';
                        if (sd1_before_4 === undefined) sd1_before_4 = '❌';
                        if (sd1_before_5 === undefined) sd1_before_5 = '❌';
                        if (sd1_before_6 === undefined) sd1_before_6 = '❌';
                        // Changes the page
                        form = form
                            // Informations
                            .replace('#connectionId#', instances[0]['id'])
                            .replace('#connectionOrigin#', instances[0]['origin'])
                            .replace('#connectionTimestamp#', instances[0]['UNIX_TIMESTAMP(timestamp)'])
                            // Titre
                            //.replace('#title_d#', getDay(new Date(weather[weather.length-1]['timestamp']).getDay()-1) + ' ' + new Date(weather[weather.length-1]['timestamp']).getDate())
                            //.replace('#title_d#', getDay(today.getDay()-1) + ' ' + today.getDate() + '/' + today.getMonth())
                            .replace('#title_d#', 'Aujourd\'hui')
                            .replace('#title_d-1#', 'Hier')
                            .replace('#title_d-2#', getDay(before_2.getDay() - 1) + ' ' + before_2.getDate() + '/' + before_2.getMonth())
                            .replace('#title_d-3#', getDay(before_3.getDay() - 1) + ' ' + before_3.getDate() + '/' + before_3.getMonth())
                            .replace('#title_d-4#', getDay(before_4.getDay() - 1) + ' ' + before_4.getDate() + '/' + before_4.getMonth())
                            .replace('#title_d-5#', getDay(before_5.getDay() - 1) + ' ' + before_5.getDate() + '/' + before_5.getMonth())
                            .replace('#title_d-6#', getDay(before_6.getDay() - 1) + ' ' + before_6.getDate() + '/' + before_6.getMonth())
                            // Capteur 1
                            .replace('#value_d_1#', sd1_today['level'])
                            .replace('#value_d-1_1#', sd1_before_1['level'])
                            .replace('#value_d-2_1#', sd1_before_2['level'])
                            .replace('#value_d-3_1#', sd1_before_3['level'])
                            .replace('#value_d-4_1#', sd1_before_4['level'])
                            .replace('#value_d-5_1#', sd1_before_5['level'])
                            .replace('#value_d-6_1#', sd1_before_6['level'])
                            // Capteur 2
                            /*
                            .replace('#value_d_1#', rs_today)
                            .replace('#value_d-1_1#', rs_before_1)
                            .replace('#value_d-2_1#', rs_before_2)
                            .replace('#value_d-3_1#', rs_before_3)
                            .replace('#value_d-4_1#', rs_before_4)
                            .replace('#value_d-5_1#', rs_before_5)
                            .replace('#value_d-6_1#', rs_before_6)
                             */
                            // Vent
                            .replace('#value_d_wind#', rs_today['windspeed'] + ' m/s')
                            .replace('#value_d-1_wind#', rs_before_1['windspeed'] + ' m/s')
                            .replace('#value_d-2_wind#', rs_before_2['windspeed'] + ' m/s')
                            .replace('#value_d-3_wind#', rs_before_3['windspeed'] + ' m/s')
                            .replace('#value_d-4_wind#', rs_before_4['windspeed'] + ' m/s')
                            .replace('#value_d-5_wind#', rs_before_5['windspeed'] + ' m/s')
                            .replace('#value_d-6_wind#', rs_before_6['windspeed'] + ' m/s')

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