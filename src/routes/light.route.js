const express = require('express')
const router = express.Router()
const lightController = require('../controllers/light.controller')

router.get('/all/:id', lightController.getAll)
router.get('/:id', lightController.get)
router.patch('/:id', lightController.update)
router.delete('/:id', lightController.delete)
router.post('/create', lightController.create)

module.exports = router