const express = require('express')
const router = express.Router()
const EventsController = require('../controllers/events.controller')


router.get('/', EventsController.eventsHandler)

module.exports = router