const router = require('express').Router(),

UserController = require('../controllers/user')


router.get('/',UserController.index)
router.post('/create',UserController.create)
router.post('/login',UserController.authenticate)

module.exports = router