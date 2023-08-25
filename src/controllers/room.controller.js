const RoomModel = require('../models/room.model')
const RoomView = require('../views/room.view')

const roomModel = new RoomModel()
const roomView = new RoomView()

class roomController {
  getAll(req, res) {
    let id = Number.parseInt(req.params.id)
    roomModel.getAll(id, (rooms) => {
      roomView.getAll(res, rooms)
    })
  }

  getDevice(req, res) {
    let id = Number.parseInt(req.params.id)
    roomModel.getDevice(id, (status, rooms) => {
      roomView.getDevice(res, status, rooms)
    })
  }
  get(req, res) {
    let id = Number.parseInt(req.params.id)
    roomModel.get(id, (status, rooms) => {
      roomView.get(res, status, rooms)
    })
  }

  update(req, res) {
    let id = Number.parseInt(req.params.id)
    let edited = req.body

    roomModel.update(id, edited, (status, message) => {
      roomView.update(res, status, message)
    })
  }

  create(req, res) {
    let newroom = req.body

    roomModel.create(newroom, (status, message) => {
      roomView.create(res, status, message)
    })
  }
  
  delete(req, res) {
    let id = Number.parseInt(req.params.id)

    roomModel.delete(id, (status, message) => {
      roomView.delete(res, status, message)
    })
  }

}

module.exports = new roomController