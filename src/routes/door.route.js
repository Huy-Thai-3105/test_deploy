const express = require('express')
const router = express.Router()
const doorController = require('../controllers/door.controller')

router.get('/all/:id', doorController.getAll)
router.get('/:id', doorController.get)
router.patch('/:id', doorController.update)
router.post('/create', doorController.create)
router.delete('/:id', doorController.delete)

module.exports = router