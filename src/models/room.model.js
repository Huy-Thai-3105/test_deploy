const Model = require("./model");

class RoomModel extends Model {
  constructor() {
    super()
  }

  getAll(id, callback) {
    this.query(
      `SELECT Room.ID, Roomname
      FROM Room
      WHERE Room.HouseID=?
      ORDER by Room.ID`,
      [id]
    )
      .then((result1) => {
        for (let i = 0; i < result1.length; i++) {
          this.query(
            `SELECT COUNT(*) as Total
            FROM Device
            WHERE Device.RoomID = ?`,
            [result1[i].ID]
          )
            .then((result2) => {
              result1[i].Total = result2[0].Total

              this.query(
                `SELECT COUNT(*) as Device_ON
                FROM Device
                WHERE Device.RoomID = ? AND Device.Device_Status = 'on'`,
                [result1[i].ID]
              )
                .then((result3) => {
                  result1[i].Device_ON = result3[0].Device_ON 
                  if (i === result1.length - 1) {
                    callback(result1)
                  }
                })
                .catch(error => callback(null))
            })
            .catch(error => callback(null))
        }
      })
      .catch(error => callback(null))
  }

  getDevice(id, callback) {
    this.conn.query(
      `SELECT * 
      FROM Device
      Where RoomID = ?`,
      [id],
      (error, results) => {
        if (error)
          return callback(405, null)
        else
          return callback(200, results)
      }
    )
  }

  get(id, callback) {
    this.conn.query(
      `SELECT * 
      FROM Room
      Where Room.ID = ?`,
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
      FROM Room
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
          this.conn.query(`UPDATE Device SET ${query} WHERE ID = ${id}`,
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

  create(newRoom, callback) {
    this.query(
      'INSERT INTO Room SET ?',
      {
        Roomname: newRoom.Roomname,
        HouseID: newRoom.HouseID
      }
    )
      .then((res) => {
        callback(200, true, 'Create success')
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
      `SELECT * FROM Room WHERE ID = ?`,
      [id]
    )
      .then(results => {
        if (results.length === 0)
          throw Error('invalid id')
        else
          return this.query(`DELETE FROM Room WHERE ID = ${id}`)
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

module.exports = RoomModel