const express = require('express')
const router = express.Router()
const airConditionController = require('../controllers/air_condition.controller')

router.get('/all/:id', airConditionController.getAll)
router.get('/:id', airConditionController.get)
router.patch('/:id', airConditionController.update)
router.post('/create', airConditionController.create)
router.delete('/:id', airConditionController.delete)

module.exports = router