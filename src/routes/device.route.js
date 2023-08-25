const express = require('express')
const router = express.Router()
const deviceController = require('../controllers/device.controller')

router.get('/all', deviceController.getAll)
router.get('/:id', deviceController.get)
router.patch('/:id', deviceController.update)
router.patch('/turn/:id', deviceController.turn)

router.get('/history/all/:type/:id', deviceController.getAllH)
router.get('/history/:id', deviceController.getH)

module.exports = router