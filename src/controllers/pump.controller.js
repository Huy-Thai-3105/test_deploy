const PumpModel = require('../models/pump.model')
const PumpView = require('../views/pump.view')

const pumpModel = new PumpModel()
const pumpView = new PumpView()

class PumpController {
  getAll(req, res) {
    let id = Number.parseInt(req.params.id)
    pumpModel.getAll(id, (pumps) => {
      pumpView.getAll(res, pumps)
    })
  }

  get(req, res) {
    let id = (req.params.id)
    pumpModel.get(id, (status, pump) => {
      pumpView.get(res, status, pump)
    })
  }

  update(req, res) {
    let id = (req.params.id)
    let edited = req.body

    pumpModel.update(id, edited, (status, message) => {
      pumpView.update(res, status, message)
    })
  }

  create(req, res) {
    let newPump = req.body
    pumpModel.create(newPump, (status, result, message) => {
      pumpView.create(res, status, result, message)
    })
  }

  delete(req, res) {
    let id = Number.parseInt(req.params.id)
    pumpModel.delete(id, (status, result, message) => {
      pumpView.delete(res, status, result, message)
    })
  }
}

module.exports = new PumpController