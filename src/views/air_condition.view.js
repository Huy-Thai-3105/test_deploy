class AirConditionView {
    getAll(res, air_conditions) {
        if (air_conditions) {
        res.status(200).json({
            result: "success",
            message: "get all air conditions",
            size: air_conditions.length,
            air_conditions: air_conditions
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

    get(res, status, air_condition) {
        if (air_condition) {
            res.status(status).json({
                result: 'success',
                message: 'get air_Condition by id',
                air_condition: air_condition
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

module.exports = AirConditionView