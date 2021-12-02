const { Router}= require('express')
const userCcontroller =require('../controllers/userController')
const router =Router();



router.post('/signup',  userCcontroller.signup_post);

router.post('/login',  userCcontroller.login_post)

router.get('/logout', userCcontroller.logout_get)

module.exports =router;