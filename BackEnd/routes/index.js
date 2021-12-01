const router = require('express').Router(),



BookRoutes = require('./book')
AuthorRoutes = require('./author')
// UserRouter= require('./user')


router.use('/books',BookRoutes)
router.use('/authors',AuthorRoutes)
// router.use('/users',UserRouter)

module.exports = router

