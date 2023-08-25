const Model = require("./model");

class HouseModel extends Model {
  constructor() {
    super()
  }

  getAll(id, callback) {
    this.conn.query(
      `SELECT * 
      FROM House
      WHERE UserID = ?`, [id],
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
      FROM House
      Where House.ID = ?`,
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
      FROM House
      WHERE ID = ?`,
      [id],
      (error, results) => {
        if (error || results.length === 0) return callback(404, "Invalid ID")
        
        let query = ""
        if (updateInfo.Housename !== "") {
          if (query != "")
            query = query.concat(", ")
          query = query.concat(`Housename = '${updateInfo.Housename}'`)
        }
        if (updateInfo.House_address !== "") {
          if (query != "")
            query = query.concat(", ")
          query = query.concat(`House_address = '${updateInfo.House_address}'`)
        }
        // let queryLight = ""
        // if (updateInfo.Mode !== "") {
        //   if (queryLight != "")
        //     queryLight = queryLight.concat(", ")
        //   queryLight = queryLight.concat(`Mode = '${updateInfo.Mode}'`)
        // }
        if (query !== "") {
          this.conn.query(`UPDATE House SET ${query} WHERE ID = ${id}`,
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

  create(newHouse, callback) {
    this.query(
      'INSERT INTO House SET ?',
      {
        Housename: newHouse.Housename,
        House_address: newHouse.House_address,
        UserID: newHouse.UserID
      }
    )
      .then(() => {
        callback(200, true, 'insert house success')
        // this.query('INSERT INTO Light SET ?',
        //   {
        //     ID: newHouse.ID
        //   }
        // )
        //   .then(() => callback(200, true, 'Create success'))
        //   .catch((error) => console.log(error))
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
      `SELECT * FROM House WHERE ID = ?`,
      [id]
    )
      .then(results => {
        if (results.length === 0)
          throw Error('invalid id')
        else
          return this.query(`DELETE FROM House WHERE ID = ${id}`)
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

module.exports = HouseModel