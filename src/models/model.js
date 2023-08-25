const mysql = require('mysql2')
const axios = require("axios");

const url = "https://io.adafruit.com/api/v2/phatnguyen1604/feeds/nutnhan1/data"

const url_cambien2 = "https://io.adafruit.com/api/v2/phatnguyen1604/feeds/cambien2"

const getLatestData = async () => {
    const { data } = await axios.get(url_cambien2);
    return data;
}

// app.get("/data", function (req, res) {
//     getLatestData().then(data => res.send(data));
// })

// app.get("/create", function (req, res) {
//     createNewData().then(res.send("success"))
// })

const database = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smarthome'
}

class Model {
    constructor() {
        this.conn = mysql.createConnection(database)
        this.conn.connect() 
    }

    query(query, arr) {
        let databaseQuery;
        databaseQuery = new Promise((resolve, reject) => {
            this.conn.query(
                query,
                arr,
                (error, results) => {
                    if (error)
                        reject(error.sqlMessage)
                    else
                        resolve(results)
                }
            )
        });

        return databaseQuery
    }

}

module.exports = Model