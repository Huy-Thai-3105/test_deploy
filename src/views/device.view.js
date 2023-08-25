class DeviceView {
    getAll(res, devices) {
        if (devices) {
            res.status(200).json({
                result: "success",
                message: "get all devices",
                size: devices.length,
                devices: devices
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

    getAllH(res, devices) {
        if (devices) {
            res.status(200).json({
                result: "success",
                message: "get all devices",
                size: devices.length,
                devices: devices
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

    getH(res, status, devices) {
        if (devices) {
            res.status(200).json({
                result: "success",
                message: "get all devices",
                size: devices.length,
                devices: devices
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

    get(res, status, device) {
        if (device) {
            res.status(status).json({
                result: 'success',
                message: 'get device by id',
                device: device
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

    turn(res, status, message) {
        res.status(status).json({
            result: status === 200 ? 'success' : 'fail',
            message: message
        })
    }
}

module.exports = DeviceView