const DeviceModel = require('../models/device.model')
const DeviceView = require('../views/device.view')

const deviceModel = new DeviceModel()
const deviceView = new DeviceView()

class deviceController {
  getAll(req, res) {
    deviceModel.getAll((devices) => {
      deviceView.getAll(res, devices)
    })
  }

  getAllH(req, res) {
    let type = req.params.type
    let id = Number.parseInt(req.params.id)
    deviceModel.getAllH(type, id, (devices) => {
      deviceView.getAllH(res, devices)
    })
  }

  getH(req, res) {
    let id = Number.parseInt(req.params.id)
    deviceModel.getH(id, (status, devices) => {
      deviceView.getH(res, status, devices)
    })
  }

  get(req, res) {
    let id = Number.parseInt(req.params.id)
    deviceModel.get(id, (status, devices) => {
      deviceView.get(res, status, devices)
    })
  }

  update(req, res) {
    let id = Number.parseInt(req.params.id)
    let edited = req.body

    deviceModel.update(id, edited, (status, message) => {
      deviceView.update(res, status, message)
    })
  }

  turn(req, res) {
    let id = Number.parseInt(req.params.id)
    let edited = req.body   
    deviceModel.turn(id, edited, (status, message) => {
      deviceView.turn(res, status, message)
    })
  }
}

module.exports = new deviceController