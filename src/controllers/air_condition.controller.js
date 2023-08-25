const AirConditionModel = require('../models/air_condition.model')
const AirConditionView = require('../views/air_condition.view')

const airConditionModel = new AirConditionModel()
const airConditionView = new AirConditionView()

class airConditionController {
  getAll(req, res) {
    let id = Number.parseInt(req.params.id)
    airConditionModel.getAll(id, (air_conditions) => {
      airConditionView.getAll(res, air_conditions)
    })
  }

  get(req, res) {
    let id = Number.parseInt(req.params.id)
    airConditionModel.get(id, (status, air_conditions) => {
      airConditionView.get(res, status, air_conditions)
    })
  }

  update(req, res) {
    let id = Number.parseInt(req.params.id)
    let edited = req.body

    airConditionModel.update(id, edited, (status, message) => {
      airConditionView.update(res, status, message)
    })
  }

  create(req, res) {
    let newAirCondition = req.body
    airConditionModel.create(newAirCondition, (status, result, message) => {
      airConditionView.create(res, status, result, message)
    })
  }

  delete(req, res) {
    let id = Number.parseInt(req.params.id)
    airConditionModel.delete(id, (status, result, message) => {
      airConditionView.delete(res, status, result, message)
    })
  }
}

module.exports = new airConditionController