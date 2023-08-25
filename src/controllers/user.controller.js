const UserModel = require('../models/user.model')
const UserView = require('../views/user.view')

const userModel = new UserModel()
const userView = new UserView()

class UserController {
  getAll(req, res) {
    userModel.getAll((users) => {
      userView.getAll(res, users)
    })
  }

  get(req, res) {
    let id = (req.params.id)
    userModel.get(id, (status, light) => {
      userView.get(res, status, light)
    })
  }

  update(req, res) {
    let id = (req.params.id)
    let edited = req.body

    userModel.update(id, edited, (status, message) => {
      userView.update(res, status, message)
    })
  }

  create(req, res) {
    let newUser = req.body
    userModel.create(newUser, (status, result, message) => {
      userView.create(res, status, result, message)
    })
  }

  delete(req, res) {
    let id = Number.parseInt(req.params.id)
    userModel.delete(id, (status, result, message) => {
      userView.delete(res, status, result, message)
    })
  }
}

module.exports = new UserController