const Model = require("./model");

class DoorModel extends Model {
  constructor() {
    super()
  }

  getAll(id, callback) {
    this.conn.query(
      `SELECT D.ID, D.Devicename, D.Device_Status, D.Mode, D.Day_add, D.RoomID, R.Roomname 
      FROM Device D, Door L, Room R
      Where D.ID = L.ID AND D.RoomID = R.ID AND R.HouseID = ?`,
      [id],
      (error, results) => {
        if (error) 
          return callback(null)
        else 
          return callback(results)
      }
    )
  }

  get(id, callback) {
    this.conn.query(
      `SELECT * 
      FROM Device JOIN Door
      ON Device.ID = Door.ID
      Where Device.ID = ?`,
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
      FROM Door
      WHERE ID = ?`,
      [id],
      (error, results) => {
        if (error || results.length === 0) return callback(404, "Invalid ID")
        
        let query = ""
        if (updateInfo.Devicename !== "") {
          if (query != "")
            query = query.concat(", ")
          query = query.concat(`Devicename = '${updateInfo.Devicename}'`)
        }
        if (updateInfo.Device_Status !== "") {
          this.sendData(updateInfo.Device_Status === "on" ? 1 : 0)
          if (query != "")
            query = query.concat(", ")
          query = query.concat(`Device_Status = '${updateInfo.Device_Status}'`)
        }
        if (updateInfo.RoomID !== "") {
          if (query != "")
            query = query.concat(", ")
          query = query.concat(`RoomID = '${updateInfo.RoomID}'`)
        }
        // let queryDoor = ""
        // if (updateInfo.Mode !== "") {
        //   if (queryDoor != "")
        //     queryDoor = queryDoor.concat(", ")
        //   queryDoor = queryDoor.concat(`Mode = '${updateInfo.Mode}'`)
        // }
        if (query !== "") {
          this.conn.query(`UPDATE Device SET ${query} WHERE ID = ?`,
          [id],
          (error, results) => {
            if (error)
              return callback(405, "invalid input")
            else 
              return callback(200, "success")
          })
        } else {
          return callback(405, "empty input")
        }
      }
    )
  }

  create(newDoor, callback) {
    this.query(
      'INSERT INTO Device SET ?',
      {
        Devicename: newDoor.Devicename,
        Device_Status: newDoor.Device_Status,
        Mode: newDoor.Mode,
        Day_add: newDoor.Day_add,
        RoomID: newDoor.RoomID
      }
    )
      .then((res) => {
        this.query('INSERT INTO Door SET ?',
          {
            ID: res.insertId
          }
        )
          .then(() => callback(200, true, 'Create success'))
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
            `DELETE FROM Door WHERE ID = ${id}`
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

module.exports = DoorModel