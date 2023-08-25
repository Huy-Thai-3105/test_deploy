const express = require('express')
const router = express.Router()
const pumpController = require('../controllers/pump.controller')

router.get('/all/:id', pumpController.getAll)
router.get('/:id', pumpController.get)
router.patch('/:id', pumpController.update)
router.post('/create', pumpController.create)
router.delete('/:id', pumpController.delete)

module.exports = router