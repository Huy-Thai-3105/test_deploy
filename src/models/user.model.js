const Model = require('./model')

class User extends Model {
  constructor() {
    super()
  }

  getAll(callback) {
    this.query(
      'SELECT * FROM User',
    )
    .then(results => callback(results))
    .catch((error) => {
      console.log(error)
      callback(null)
    })
  }

  get(id, callback) {
    this.conn.query(
      `SELECT * 
      FROM User
      Where User.ID = ?`,
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
      FROM User
      WHERE ID = ?`,
      [id],
      (error, results) => {
        if (error || results.length === 0) return callback(404, "Invalid ID")

        let query = ""
        if (updateInfo.Pass !== "") {
          query = query.concat(`Pass = '${updateInfo.Pass}'`)
        }
        if (query !== "") {
          this.conn.query(`UPDATE User SET ${query} WHERE ID = ?`, [id],
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

  create(newUser, callback) {
    this.query(
      'INSERT INTO User SET ?',
      {
        SSN: newUser.SSN,
        Email: newUser.Email,
        Phone: newUser.Phone,
        FName: newUser.Fname,
        LName: newUser.Lname,
        City: newUser.City,
        District: newUser.District,
        Username: newUser.Username,
        Pass: newUser.Pass,
        Role: newUser.Role
      }
    )
      .then(() => {
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
      `SELECT * FROM User WHERE ID = ?`,
      [id]
    )
      .then(results => {
        if (results.length === 0)
          throw Error('invalid id')
        else
          return this.query(
            `DELETE FROM User WHERE ID = ${id}`
          )
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

module.exports = User