class RecordView {
  getAllT(res, records) {
    if (records) {
      res.status(200).json({
        result: "success",
        message: "get all records by id",
        size: records.length,
        records: records
      })
    } else {
      res.status(400).json({
        result: 'fail',
        message: 'something wrong happened, please try again',
        size: null,
        records: null
      })
    }
  }

  getT(res, status, record) {
    if (record) {
      res.status(status).json({
        result: 'success',
        message: 'get record by id',
        record: record
      })
    }
    else {
      res.status(status).json({
        result: 'fail',
        message: 'id not exist or something wrong happened',
      })
    }
  }

  getAllH(res, records) {
    if (records) {
      res.status(200).json({
        result: "success",
        message: "get all records by id",
        size: records.length,
        records: records
      })
    } else {
      res.status(400).json({
        result: 'fail',
        message: 'something wrong happened, please try again',
        size: null,
        records: null
      })
    }
  }

  getH(res, status, record) {
    if (record) {
      res.status(status).json({
        result: 'success',
        message: 'get record by id',
        record: record
      })
    }
    else {
      res.status(status).json({
        result: 'fail',
        message: 'id not exist or something wrong happened',
      })
    }
  }
  
  getAllTS(res, records) {
    if (records) {
      res.status(200).json({
        result: "success",
        message: "get all records by id",
        size: records.length,
        records: records
      })
    } else {
      res.status(400).json({
        result: 'fail',
        message: 'something wrong happened, please try again',
        size: null,
        records: null
      })
    }
  }

  getTS(res, status, record) {
    if (record) {
      res.status(status).json({
        result: 'success',
        message: 'get record by id',
        record: record
      })
    }
    else {
      res.status(status).json({
        result: 'fail',
        message: 'id not exist or something wrong happened',
      })
    }
  }

  getAllHS(res, records) {
    if (records) {
      res.status(200).json({
        result: "success",
        message: "get all records by id",
        size: records.length,
        records: records
      })
    } else {
      res.status(400).json({
        result: 'fail',
        message: 'something wrong happened, please try again',
        size: null,
        records: null
      })
    }
  }

  getHS(res, status, record) {
    if (record) {
      res.status(status).json({
        result: 'success',
        message: 'get record by id',
        record: record
      })
    }
    else {
      res.status(status).json({
        result: 'fail',
        message: 'id not exist or something wrong happened',
      })
    }
  }
}

module.exports = RecordView