// router to direction all requests 

const express = require('express')
const router = express.Router(),
UserController = require('../controllar/user')

//call functions from  UserController by use router obj.
router.get('/',UserController.index)
router.post('/signup',UserController.signup)


//exports to use this router in app
module.exports = router