const express = require('express')
const router = express.Router()
const roomController = require('../controllers/room.controller')

router.get('/all/:id', roomController.getAll)
router.get('/device/:id', roomController.getDevice)
router.get('/:id', roomController.get)
router.patch('/:id', roomController.update)
router.post('/create', roomController.create)
router.delete('/:id', roomController.delete)

module.exports = router