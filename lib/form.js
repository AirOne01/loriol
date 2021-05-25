const fs = require('fs');
const path = require('path');

module.exports = function (db, id, callback) {
    let form = fs.readFileSync(path.resolve(__dirname, '../web/dashboard.html'), "utf-8");

    //const query = `SELECT FROM (level, timestamp) VALUES (${res.data["sound1"]}, ${Date.now()});`;
    let sound1, sound2, sound3, weather, instances;
    db.query(`SELECT * FROM sound1`, (err, res) => {
        if (err) throw err;
        sound1 = res;
        db.query(`SELECT * FROM sound2`, (err, res) => {
            if (err) throw err;
            sound2 = res;
            db.query(`SELECT * FROM sound3`, (err, res) => {
                if (err) throw err;
                sound3 = res;
                db.query(`SELECT temp, temp_feels, pressure, humidity, weatherid, windspeed, winddeg, clouds, rain, UNIX_TIMESTAMP(sunrise), UNIX_TIMESTAMP(sunset), UNIX_TIMESTAMP(timestamp), timestamp FROM weather`, (err, res) => {
                    if (err) throw err;
                    weather = res;
                    db.query(`SELECT id, origin, UNIX_TIMESTAMP(timestamp) FROM instances WHERE (id=${id})`, (err, res) => {
                        if (err) throw err;
                        instances = res;
                        console.log(weather[0]['UNIX_TIMESTAMP(timestamp)']);

                        form = form
                            // Informations
                            .replace('#connectionId#', instances[0]['id'])
                            .replace('#connectionOrigin#', instances[0]['origin'])
                            .replace('#connectionTimestamp#', instances[0]['UNIX_TIMESTAMP(timestamp)'])
                            // Sound table
                            .replace('#title_d#', getDay(new Date(weather[weather.length-1]['timestamp']).getDay()-1) + ' ' + new Date(weather[weather.length-1]['timestamp']).getDate())

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
        case 4: {
            return 'Jeudi';
        }
        case 5: {
            return 'Vendredi';
        }
        case 6: {
            return 'Samedi';
        }
        case 7: {
            return 'Dimanche';
        }
    }
}