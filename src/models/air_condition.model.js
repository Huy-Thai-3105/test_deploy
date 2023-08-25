const Model = require("./model");

class AirConditionModel extends Model {
  constructor() {
    super()
  }

  getAll(id, callback) {
    this.conn.query(
      `SELECT D.ID, Devicename, Device_Status, Mode, Day_add, D.RoomID, Temperature_D, Humidity_D, S.ID SensorID
      FROM Device D, Air_Condition A, Sensor S, Room R
      Where R.HouseID = ? AND R.ID = D.RoomID AND D.ID = A.ID AND D.ID = S.DeviceID 
      `,
      [id],
      (error, results) => {
        if (error)
          return callback(null)
        else {
          results.forEach((e, index) => {
            this.query(
              `SELECT SensorID, TimeDate, Temperature
              From RecordT R
              Where R.SensorID = ${e.SensorID}
              ORDER BY TimeDate DESC LIMIT 1`
            )
              .then(result1 => {
                e.Temperature = result1[0] ? result1[0].Temperature : 0

                this.query(
                  `SELECT SensorID, TimeDate, Humidity
                  From RecordH R
                  Where R.SensorID = ${e.SensorID}
                  ORDER BY TimeDate DESC LIMIT 1`
                )
                  .then(result2 => {
                    e.Humidity = result2[0] ? result2[0].Humidity : 0
                    if (index === results.length - 1) {
                      callback(results)
                    }
                  })
                  .catch(error => { console.log(error); callback(null) })
              })
              .catch(error => { console.log(error); callback(null) })
          })
        }
      }
    )
  }

  get(id, callback) {
    this.conn.query(
      `SELECT D.ID, Devicename, Device_Status, Mode, Day_add, D.RoomID, Temperature_D, Humidity_D, Temperature, Humidity, RT.TimeDate, RH.TimeDate, S.ID SensorID
      FROM Device D, Air_Condition A, RecordT RT, RecordH RH, Sensor S
      Where D.ID = ? AND D.ID = A.ID AND D.ID=S.DeviceID AND RT.SensorID = S.ID AND RH.SensorID = S.ID 
      ORDER BY RT.TimeDate, RH.TimeDate DESC LIMIT 1`,
      [id],
      (error, results) => {
        if (error)
          return callback(405, null)
        else if (results.length === 0)
          return callback(404, null)
        else
          return callback(200, results[0])
      }
    )
  }

  update(id, updateInfo, callback) {
    this.conn.query(
      `SELECT ID
      FROM Air_Condition
      WHERE ID = ?`,
      [id],
      (error, results) => {
        if (error || results.length === 0) return callback(404, "Invalid ID")

        let query = ""
        if (updateInfo.Temperature_D !== "") {
          if (query != "")
            query = query.concat(", ")
          query = query.concat(`Temperature_D = ${updateInfo.Temperature_D}`)
        }
        if (updateInfo.Humidity_D !== "") {
          if (query != "")
            query = query.concat(", ")
          query = query.concat(`Humidity_D = ${updateInfo.Humidity_D}`)
        }
        if (query !== "") {
          this.conn.query(`UPDATE Air_Condition SET ${query} WHERE ID = ${id}`,
            (error, results) => {
              if (error) {
                console.log(error)
                return callback(405, "invalid input")
              }
              else
                return callback(200, "success")
            })
        } else {
          return callback(405, "empty input")
        }
      }
    )
  }

  create(newAirCondition, callback) {
    this.query(
      'INSERT INTO Device SET ?',
      {
        Devicename: newAirCondition.Devicename,
        Device_Status: newAirCondition.Device_Status,
        Mode: newAirCondition.Mode,
        Day_add: newAirCondition.Day_add,
        RoomID: newAirCondition.RoomID
      }
    )
      .then((result) => {
        console.log(result)
        this.query('INSERT INTO Air_Condition SET ?',
          {
            ID: result.insertId,
            Temperature_D: newAirCondition.Temperature_D,
            Humidity_D: newAirCondition.Humidity_D
          }
        )
          .then(() => {
            this.query(`UPDATE Sensor SET DeviceID = ${result.insertId} WHERE DeviceID is null LIMIT 1`)
            .then (() => 
            callback(200, true, 'Create success')
            )
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => {
        console.log(error)
        if (error.includes('Duplicate entry'))
          callback(400, false, 'Duplicate entry')
        else
          callback(400, false, 'something wrong happened, please try again')
      })
  }

  delete(id, callback) {
    this.query(
      `SELECT * FROM Device WHERE ID = ?`,
      [id]
    )
      .then(results => {
        if (results.length === 0)
          throw Error('invalid id')
        else
          return this.query(
            `DELETE FROM Air_Condition WHERE ID = ${id}`
          )
            .then(() => {
              return this.query(`DELETE FROM Device WHERE ID = ${id}`)
            })
      })
      .then(() => {
        callback(200, true, 'delete success')
      })
      .catch(error => {
        console.log(error);
        if (error.message === 'invalid id')
          callback(406, false, error.message)
        else
          callback(400, false, 'something wrong happened, please try again')
      })
  }
}

module.exports = AirConditionModel