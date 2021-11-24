const router = require('express').Router(),



BookRoutes = require('./book')
AuthorRoutes = require('./author')



router.use('/books',BookRoutes)
router.use('/authors',AuthorRoutes)

module.exports = router

