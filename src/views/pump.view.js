class PumpView {
  getAll(res, pumps) {
    if (pumps) {
      res.status(200).json({
        result: "success",
        message: "get all pumps",
        size: pumps.length,
        pumps: pumps
      })
    } else {
      res.status(400).json({
        result: 'fail',
        message: 'something wrong happened, please try again',
        size: null,
        workers: null
      })
    }
  }

  get(res, status, pump) {
    if (pump) {
      res.status(status).json({
        result: 'success',
        message: 'get pump by id',
        pump: pump
      })
    }
    else {
      res.status(status).json({
        result: 'fail',
        message: 'id not exist or something wrong happened',
      })
    }
  }

  update(res, status, message) {
    res.status(status).json({
      result: status === 200 ? 'success' : 'fail',
      message: message
    })
  }

  create(res, status, result, message) {
    res.status(status).json({
      result: result ? 'success' : 'fail',
      message
    })
  }

  delete(res, status, result, message) {
    res.status(status).json({
      result: result ? 'success' : 'fail',
      message
    })
  }
}

module.exports = PumpView