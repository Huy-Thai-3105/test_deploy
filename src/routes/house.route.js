const express = require('express')
const router = express.Router()
const houseController = require('../controllers/house.controller')

router.get('/all/:id', houseController.getAll)
router.get('/:id', houseController.get)
router.patch('/:id', houseController.update)
router.post('/create', houseController.create)
router.delete('/:id', houseController.delete)

module.exports = router