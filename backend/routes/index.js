//index.js للتحويل بين اكثر من راوتر 

const express = require('express')
const router = express.Router(),
AuthorRoutes = require('./author'),
BookRoutes = require('./book'),
UserRoutes = require('./user')


// pathes to will use to call all functions routes
router.use('/authors',AuthorRoutes)
router.use('/books',BookRoutes)
router.use('/user',UserRoutes)

//exports to use this router in application 
module.exports = router