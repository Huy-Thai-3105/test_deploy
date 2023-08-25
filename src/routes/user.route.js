const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')
const verifyRole = require('../middlewares/verifyRole')

router.get('/all', userController.getAll)
router.get('/:id', userController.get)
router.patch('/:id', userController.update)
router.post('/create', userController.create)
router.delete('/:id', userController.delete)

module.exports = router