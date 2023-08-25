const DoorModel = require('../models/door.model')
const DoorView = require('../views/door.view')

const doorModel = new DoorModel()
const doorView = new DoorView()

class doorController {
  getAll(req, res) {
    let id = Number.parseInt(req.params.id)
    doorModel.getAll(id, (doors) => {
      doorView.getAll(res, doors)
    })
  }

  get(req, res) {
    let id = Number.parseInt(req.params.id)
    doorModel.get(id, (status, doors) => {
      doorView.get(res, status, doors)
    })
  }

  update(req, res) {
    let id = Number.parseInt(req.params.id)
    let edited = req.body

    doorModel.update(id, edited, (status, message) => {
      doorView.update(res, status, message)
    })
  }

  create(req, res) {
    let newDoor = req.body
    doorModel.create(newDoor, (status, result, message) => {
      doorView.create(res, status, result, message)
    })
  }

  delete(req, res) {
    let id = Number.parseInt(req.params.id)
    lightModel.delete(id, (status, result, message) => {
      lightView.delete(res, status, result, message)
    })
  }
}

module.exports = new doorController