const RecordModel = require('../models/record.model')
const RecordView = require('../views/record.view')

const recordModel = new RecordModel()
const recordView = new RecordView()

class recordController {
  getAllT(req, res) {
    let id = (req.params.id)
    recordModel.getAllT(id, (records) => {
      recordView.getAllT(res, records)
    })
  }

  getT(req, res) {
    let id = (req.params.id)
    recordModel.getT(id, (status, record) => {
      recordView.getT(res, status, record)
    })
  }

  getAllH(req, res) {
    let id = (req.params.id)
    recordModel.getAllH(id, (records) => {
      recordView.getAllH(res, records)
    })
  }

  getH(req, res) {
    let id = (req.params.id)
    recordModel.getH(id, (status, record) => {
      recordView.getH(res, status, record)
    })  
  }

  
  getAllTS(req, res) {
    let id = (req.params.id)
    recordModel.getAllTS(id, (records) => {
      recordView.getAllTS(res, records)
    })
  }

  getTS(req, res) {
    let id = (req.params.id)
    recordModel.getTS(id, (status, record) => {
      recordView.getTS(res, status, record)
    })
  }

  getAllHS(req, res) {
    let id = (req.params.id)
    recordModel.getAllHS(id, (records) => {
      recordView.getAllHS(res, records)
    })
  }

  getHS(req, res) {
    let id = (req.params.id)
    recordModel.getHS(id, (status, record) => {
      recordView.getHS(res, status, record)
    })
  }

}

module.exports = new recordController