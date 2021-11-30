const express = require('express')
const router = express.Router(),
AuthenController = require('../controllar/authen')
router.use(express.json());

router.use(express.json());

router.get('/signup', AuthenController.signup_get);
router.post('/signup', AuthenController.signup_post);

router.get('/login', AuthenController.login_get);
router.post('/login',AuthenController.login_post);

module.exports = router;