const LightModel = require('../models/light.model')
const LightView = require('../views/light.view')

const lightModel = new LightModel()
const lightView = new LightView()

class lightController {
  getAll(req, res) {
    let id = Number.parseInt(req.params.id)
    lightModel.getAll(id, (lights) => {
      lightView.getAll(res, lights)
    })
  }
  
  get(req, res) {
    let id = (req.params.id)
    lightModel.get(id, (status, light) => {
      lightView.get(res, status, light)
    })
  }

  update(req, res) {
    let id = (req.params.id)
    let edited = req.body

    lightModel.update(id, edited, (status, message) => {
      lightView.update(res, status, message)
    })
  }

  create(req, res) {
    let newLight = req.body
    lightModel.create(newLight, (status, result, message) => {
      lightView.create(res, status, result, message)
    })
  }

  delete(req, res) {
    let id = Number.parseInt(req.params.id)
    lightModel.delete(id, (status, result, message) => {
      lightView.delete(res, status, result, message)
    })
  }
}

module.exports = new lightController