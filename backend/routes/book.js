// router to direction all requests 

const express = require('express')
const router = express.Router(),
BookController = require('../controllar/book')
router.use(express.json());


//call functions from  BookController by use router obj.
router.get('/',BookController.index)
router.get('/:bookid', BookController.show)
router.put('/:bookid/update', BookController.update)
router.delete('/:bookid/delete', BookController.delete)
router.post('/create',BookController.create)

//exports to use this router in app
module.exports = router