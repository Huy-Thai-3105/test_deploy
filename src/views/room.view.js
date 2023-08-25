class RoomView {
    getAll(res, rooms) {
        if (rooms) {
        res.status(200).json({
            result: "success",
            message: "get all rooms",
            size: rooms.length,
            rooms: rooms
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

    getDevice(res, status, room) {
        if (room) {
            res.status(status).json({
                result: 'success',
                message: 'get room by id',
                size: room.length,
                room: room
            })
        }
        else {
            res.status(status).json({
                result: 'fail',
                message: 'id not exist or something wrong happened',
            })
        }
    }
    get(res, status, room) {
        if (room) {
            res.status(status).json({
                result: 'success',
                message: 'get room by id',
                room: room
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

    create(res, status, message) {
        res.status(status).json({
        result: status === 200 ? 'success' : 'fail',
        message: message
        })
    }
    delete(res, status, message) {
        res.status(status).json({
        result: status === 200 ? 'success' : 'fail',
        message: message
        })
    }
}

module.exports = RoomView