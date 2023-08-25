const Model = require("./model");

class RecordModel extends Model {
  constructor() {
    super()
  }

  getAllT(id, callback) {
    this.conn.query(
      `SELECT S.ID, Temperature, DATE_FORMAT(TimeDate, "%H:%i:%s") AS GetTime 
      FROM RecordT R, Sensor S, Device D, Air_Condition A
      WHERE R.SensorID = S.ID AND S.DeviceID = D.ID AND D.RoomID = ? AND D.ID = A.ID
      ORDER BY TimeDate DESC LIMIT 20`,
      [id],
      (error, results) => {
        if (error) 
          return callback(null)
        else 
          return callback(results.reverse())
      }
    )
  }

  getT(id, callback) {
    this.conn.query(
      `SELECT S.ID, Temperature, DATE_FORMAT(TimeDate, "%H:%i:%s") AS GetTime 
      FROM RecordT R, Sensor S, Device D, Air_Condition A
      WHERE R.SensorID = S.ID AND S.DeviceID = D.ID AND D.RoomID = ? AND D.ID = A.ID
      ORDER BY TimeDate DESC LIMIT 1`,
      [id],
      (error, results) => {
        if (error)
          return callback(405, null)
        else if (results.length === 0) 
          return callback(404, null)
        else
          return callback(200, results.reverse())
      }
    )
  }

  getAllH(id, callback) {
    this.conn.query(
      `SELECT S.ID, Humidity, DATE_FORMAT(TimeDate, "%H:%i:%s") AS GetTime 
      FROM RecordH R, Sensor S, Device D, Air_Condition A
      WHERE R.SensorID = S.ID AND S.DeviceID = D.ID AND D.RoomID = ? AND D.ID = A.ID
      ORDER BY TimeDate DESC LIMIT 20`,
      [id],
      (error, results) => {
        if (error) 
          return callback(null)
        else 
          return callback(results.reverse())
      }
    )
  }

  getH(id, callback) {
    this.conn.query(
      `SELECT S.ID, Humidity, DATE_FORMAT(TimeDate, "%H:%i:%s") AS GetTime 
      FROM RecordH R, Sensor S, Device D, Air_Condition A
      WHERE R.SensorID = S.ID AND S.DeviceID = D.ID AND D.RoomID = ? AND D.ID = A.ID
      ORDER BY TimeDate DESC LIMIT 1`,
      [id],
      (error, results) => {
        if (error)
          return callback(405, null)
        else if (results.length === 0) 
          return callback(404, null)
        else
          return callback(200, results.reverse())
      }
    )
  }


  getAllTS(id, callback) {
    this.conn.query(
      `SELECT S.ID, Temperature, DATE_FORMAT(TimeDate, "%H:%i:%s") AS GetTime 
      FROM RecordT R, Sensor S, Device D, Water_pumps A
      WHERE R.SensorID = S.ID AND S.DeviceID = D.ID AND D.RoomID = ? AND D.ID = A.ID
      ORDER BY TimeDate DESC LIMIT 20`,
      [id],
      (error, results) => {
        if (error) 
          return callback(null)
        else 
          return callback(results.reverse())
      }
    )
  }

  getTS(id, callback) {
    this.conn.query(
      `SELECT S.ID, Temperature, DATE_FORMAT(TimeDate, "%H:%i:%s") AS GetTime 
      FROM RecordT R, Sensor S, Device D, Water_pumps A
      WHERE R.SensorID = S.ID AND S.DeviceID = D.ID AND D.RoomID = ? AND D.ID = A.ID
      ORDER BY TimeDate DESC LIMIT 1`,
      [id],
      (error, results) => {
        if (error)
          return callback(405, null)
        else if (results.length === 0) 
          return callback(404, null)
        else
          return callback(200, results.reverse())
      }
    )
  }

  getAllHS(id, callback) {
    this.conn.query(
      `SELECT S.ID, Humidity, DATE_FORMAT(TimeDate, "%H:%i:%s") AS GetTime
      FROM RecordH R, Sensor S, Device D, Water_pumps A
      WHERE R.SensorID = S.ID AND S.DeviceID = D.ID AND D.RoomID = ? AND D.ID = A.ID
      ORDER BY TimeDate DESC LIMIT 20`,
      [id],
      (error, results) => {
        if (error) 
          return callback(null)
        else 
          return callback(results.reverse())
      }
    )
  }

  getHS(id, callback) {
    this.conn.query(
      `SELECT S.ID, Humidity, DATE_FORMAT(TimeDate, "%H:%i:%s") AS GetTime 
      FROM RecordH R, Sensor S, Device D, Water_pumps A
      WHERE R.SensorID = S.ID AND S.DeviceID = D.ID AND D.RoomID = ? AND D.ID = A.ID
      ORDER BY TimeDate DESC LIMIT 1`,
      [id],
      (error, results) => {
        if (error)
          return callback(405, null)
        else if (results.length === 0) 
          return callback(404, null)
        else
          return callback(200, results.reverse())
      }
    )
  }

}

module.exports = RecordModel