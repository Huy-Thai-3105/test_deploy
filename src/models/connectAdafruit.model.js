const Model = require("./model")
const axios = require("axios");
const EventsController = require('../controllers/events.controller')
const formatDate = require('../utils/formatDate')

require('dotenv').config()
const mqtt = require('mqtt')
let client = mqtt.connect(`mqtt://${process.env.ADAFRUIT_IO_USERNAME}:${process.env.ADAFRUIT_IO_KEY}@io.adafruit.com`,
  8883
);

// console.log(client)


const GetData = () => {
  const model = new Model;

  client.on("connect", function () {
    client.subscribe(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/cambien1`); // nhiet do
    client.subscribe(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/cambien2`); // do am
    client.subscribe(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/cambien3`); // hong ngoai True/False
    client.subscribe(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/nutnhan1`); // quat
    client.subscribe(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/nutnhan2`); // may bom
    client.subscribe(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/nutnhan3`); // cửa
    console.log("Connect to adafruit success");
  });

  client.on("message", async function (topic, message) {
    if (topic == `${process.env.ADAFRUIT_IO_USERNAME}/feeds/cambien1`) {
      let value = Number.parseFloat(message)
      const day = formatDate(new Date())
      model.query(`SELECT * FROM Air_Condition A, Device D Where A.ID = D.ID ORDER BY D.ID ASC`)
        .then(res => {
          if (res.length !== 0) {
            const data = {
              "Temperature": value,
              "ID": res[0].ID
            }
            EventsController.sendEventsToAll(data)
            if (value > res[0].Temperature_D && res[0].Device_Status === 'off' && res[0].Mode === "auto") {
              postData(1, 1)
            }
            if (value <= res[0].Temperature_D - 2 && res[0].Device_Status === 'on' && res[0].Mode === "auto") {
              postData(1, 0)
            }
          }
        })
        .catch(e => console.log(e))
      model.query(
        `INSERT INTO RecordT(TimeDate, Temperature, SensorID) VALUES ('${day}',${value},'1')`,
        (error, results) => {
          if (error)
            console.log(error)
        }
      )
      model.query(
        `INSERT INTO RecordT(TimeDate, Temperature, SensorID) VALUES ('${day}',${value},'9')`,
        (error, results) => {
          if (error)
            console.log(error)
        }
      )
    }
    if (topic == `${process.env.ADAFRUIT_IO_USERNAME}/feeds/cambien2`) {
      let value = Number.parseFloat(message)
      const day = formatDate(new Date())
      model.query(`SELECT * FROM Water_pumps A, Device D Where A.ID = D.ID ORDER BY D.ID ASC`)
        .then(res => {
          if (res.length !== 0) {
            const data = {
              "Humidity": value,
              "ID": res[0].ID
            }
            EventsController.sendEventsToAll(data)
            if (value < res[0].Humidity_D && res[0].Device_Status === 'off' && res[0].Mode === "auto") {
              postData(2, 1)
            }
            if (value >= res[0].Humidity_D + 5 && res[0].Device_Status === 'on' && res[0].Mode === "auto") {
              postData(2, 0)
            }
          }
        })
        .catch(e => console.log(e))

      model.query(
        `INSERT INTO RecordH(TimeDate, Humidity, SensorID) VALUES ('${day}',${value},'1')`,
        (error, results) => {
          if (error)
            console.log(error)
        }
      )
      model.query(
        `INSERT INTO RecordH(TimeDate, Humidity, SensorID) VALUES ('${day}',${value},'9')`,
        (error, results) => {
          if (error)
            console.log(error)
        }
      )
    }

    if (topic == `${process.env.ADAFRUIT_IO_USERNAME}/feeds/cambien3`) {
      let value = (message.toString())
      let queryH = ""
      const day = formatDate(new Date())
      model.query(`SELECT * FROM Light ORDER BY ID ASC`)
        .then((result) => {
          if (result.length !== 0) {
            const data = {
              "value": value === "True" ? 'on' : 'off',
              "ID": result[0].ID
            }
            EventsController.sendEventsToAll(data)
            let query = `Device_Status = '${value === "True" ? 'on' : 'off'}'`
            model.query(`UPDATE Device SET ${query} WHERE ID = ${result[0].ID}`,
              (error, result) => {
                if (error)
                  console.log(error)
              })
            if (value === "True")
              queryH = queryH.concat(`INSERT INTO Device_History (ID, Turn_on_Time) VALUES (${result[0].ID}, '${day}')`)
            else
              queryH = queryH.concat(`UPDATE Device_History SET Turn_off_Time = '${day}' WHERE ID = ${result[0].ID} AND Turn_off_Time is null`)
            model.query(queryH, (error, results) => {
              if (error) {
                console.log(error)
              }
            })
          }
        })
        .catch(e => console.log(e))

    }
    if (topic == `${process.env.ADAFRUIT_IO_USERNAME}/feeds/nutnhan1`) {
      let value = Number.parseInt(message)
      let queryH = ""
      const day = formatDate(new Date())
      model.query(`SELECT * FROM Air_Condition ORDER BY ID ASC`)
        .then((result) => {
          if (result.length !== 0) {
            const data = {
              "value": value === 1 ? 'on' : 'off',
              "ID": result[0].ID
            }
            EventsController.sendEventsToAll(data)
            let query = `Device_Status = '${value === 1 ? 'on' : 'off'}'`
            model.query(`UPDATE Device SET ${query} WHERE ID = ${result[0].ID}`,
              (error, result) => {
                if (error)
                  console.log(error)
              })
            if (value)
              queryH = queryH.concat(`INSERT INTO Device_History (ID, Turn_on_Time) VALUES (${result[0].ID}, '${day}')`)
            else
              queryH = queryH.concat(`UPDATE Device_History SET Turn_off_Time = '${day}' WHERE ID = ${result[0].ID} AND Turn_off_Time is null`)
            model.query(queryH, (error, results) => {
              if (error) {
                console.log(error)
              }
            })
          }
        })
        .catch(e => console.log(e))

    }
    if (topic == `${process.env.ADAFRUIT_IO_USERNAME}/feeds/nutnhan2`) {
      let value = Number.parseInt(message)
      let queryH = ""
      const day = formatDate(new Date())
      model.query(`SELECT * FROM Water_pumps ORDER BY ID ASC`)
        .then((result) => {
          if (result.length !== 0) {
            const data = {
              "value": value === 1 ? 'on' : 'off',
              "ID": result[0].ID
            }
            EventsController.sendEventsToAll(data)
            let query = `Device_Status = '${value === 1 ? 'on' : 'off'}'`
            model.query(`UPDATE Device SET ${query} WHERE ID = ${result[0].ID}`,
              (error, result) => {
                if (error)
                  console.log(error)
              })
            
            if (value)
              queryH = queryH.concat(`INSERT INTO Device_History (ID, Turn_on_Time) VALUES (${result[0].ID}, '${day}')`)
            else
              queryH = queryH.concat(`UPDATE Device_History SET Turn_off_Time = '${day}' WHERE ID = ${result[0].ID} AND Turn_off_Time is null`)
              model.query(queryH, (error, results) => {
              if (error) {
                console.log(error)
              }
            })
          }
        })
        .catch(e => console.log(e))
    }
    if (topic == `${process.env.ADAFRUIT_IO_USERNAME}/feeds/nutnhan3`) {
      let value = Number.parseInt(message)
      let queryH = ""
      const day = formatDate(new Date())
      model.query(`SELECT * FROM Door ORDER BY ID ASC`)
        .then((result) => {
          if (result.length !== 0) {
            const data = {
              "value": value === 1 ? 'on' : 'off',
              "ID": result[0].ID
            }
            EventsController.sendEventsToAll(data)
            let query = `Device_Status = '${value === 1 ? 'on' : 'off'}'`
            model.query(`UPDATE Device SET ${query} WHERE ID = ${result[0].ID}`,
              (error, result) => {
                if (error)
                  console.log(error)
              })
            if (value)
              queryH = queryH.concat(`INSERT INTO Device_History (ID, Turn_on_Time) VALUES (${result[0].ID}, '${day}')`)
            else
              queryH = queryH.concat(`UPDATE Device_History SET Turn_off_Time = '${day}' WHERE ID = ${result[0].ID} AND Turn_off_Time is null`)
            model.query(queryH, (error, results) => {
              if (error) {
                console.log(error)
              }
            })
          }
        })
        .catch(e => console.log(e))
    }
  })



  // setInterval(() => {
  //   const model = new Model;
  //   const url_cambien2 = "https://io.adafruit.com/api/v2/phatnguyen1604/feeds/cambien2"

  //   const getLatestData = async () => {
  //     const { data } = await axios.get(url_cambien2);
  //     return data;
  //   }

  //   const day = formatDate(new Date())

  //   getLatestData()
  //     .then((data) => {
  //       if (data.last_value != lastTemp) {
  //         EventsController.sendEventsToAll(data.last_value)
  //         lastTemp = data.last_value
  //       }
  //       model.query(
  //         `INSERT INTO Record(TimeDate, Temperature, Humidity, SensorID) VALUES ('${day}',${data.last_value},${data.last_value},'1')`,
  //         (error, results) => {
  //           if (error)
  //             console.log(error)
  //           else
  //             console.log("sucess")
  //         }
  //       )
  //     })
  //     .catch(error => console.log(error))
  // }, 5000)
}

const postData = (id, data) => {
  let des;
  if (id === 1)
    des = "nutnhan1"
  else if (id === 2)
    des = "nutnhan2"
  else if (id === 3)
    des = "nutnhan3"
  console.log(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/${des} `, data.toString())
  try {
    client.publish(`${process.env.ADAFRUIT_IO_USERNAME}/feeds/${des}`, data.toString())
  }
  catch (error) {
    console.log(error)
  }
  //hong ngoai 
}
module.exports = { GetData, postData }