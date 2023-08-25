const Model = require("./model");

class LightModel extends Model {
  constructor() {
    super()
  }

  getAll(id, callback) {
    this.conn.query(
      `SELECT D.ID, D.Devicename, D.Device_Status, D.Mode, D.Day_add, D.RoomID, R.Roomname 
      FROM Device D, Light L, Room R
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
      FROM Device JOIN Light
      ON Device.ID = Light.ID
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
      FROM Light
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
        // let queryLight = ""
        // if (updateInfo.Mode !== "") {
        //   if (queryLight != "")
        //     queryLight = queryLight.concat(", ")
        //   queryLight = queryLight.concat(`Mode = '${updateInfo.Mode}'`)
        // }
        if (query !== "") {
          this.conn.query(`UPDATE Device SET ${query} WHERE ID = ?`, [id],
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

  create(newLight, callback) {
    this.query(
      'INSERT INTO Device SET ?',
      {
        Devicename: newLight.Devicename,
        Device_Status: newLight.Device_Status,
        Mode: newLight.Mode, 
        Day_add: newLight.Day_add,
        RoomID: newLight.RoomID
      }
    )
      .then((res) => {
        this.query('INSERT INTO Light SET ?',
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
            `DELETE FROM Light WHERE ID = ${id}`
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

module.exports = LightModel