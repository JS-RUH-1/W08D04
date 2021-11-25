// router to direction all requests 

const express = require('express')
const router = express.Router(),
UserController = require('../controllar/user')
router.use(express.json());


//call functions from  UserController by use router obj.
router.get('/',UserController.index)
router.post('/signup',UserController.signup)


//exports to use this router in app
module.exports = router