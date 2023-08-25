const express = require('express')
const router = express.Router()
const recordController = require('../controllers/record.controller')

router.get('/temperature/all/:id', recordController.getAllT)
router.get('/humidity/all/:id', recordController.getAllH)
router.get('/temperature/:id', recordController.getT)
router.get('/humidity/:id', recordController.getH)

router.get('/soil/temperature/all/:id', recordController.getAllTS)
router.get('/soil/humidity/all/:id', recordController.getAllHS)
router.get('/soil/temperature/:id', recordController.getTS)
router.get('/soil/humidity/:id', recordController.getHS)

module.exports = router