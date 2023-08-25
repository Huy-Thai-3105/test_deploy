const HouseModel = require('../models/house.model')
const HouseView = require('../views/house.view')

const houseModel = new HouseModel()
const houseView = new HouseView()

class houseController {
  getAll(req, res) {
    let id = Number.parseInt(req.params.id)
    houseModel.getAll(id, (houses) => {
      houseView.getAll(res, houses)
    })
  }

  get(req, res) {
    let id = (req.params.id)
    houseModel.get(id, (status, house) => {
      houseView.get(res, status, house)
    })
  }

  update(req, res) {
    let id = (req.params.id)
    let edited = req.body

    houseModel.update(id, edited, (status, message) => {
      houseView.update(res, status, message)
    })
  }

  create(req, res) {
    let newHouse = req.body
    houseModel.create(newHouse, (status, result, message) => {
      houseView.create(res, status, result, message)
    })
  }

  delete(req, res) {
    let id = Number.parseInt(req.params.id)
    houseModel.delete(id, (status, result, message) => {
      houseView.delete(res, status, result, message)
    })
  }
}

module.exports = new houseController