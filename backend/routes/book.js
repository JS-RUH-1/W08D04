const router = require("express").Router(),
BookController= require('../controllers/book')

router.get('/', BookController.index )
// show books by id 
router.get('/:bid',BookController.show)
router.put('/:bid/update',BookController.update) /* هنا بيكون التحديث على صيغة جيسون عشان كذا لازم نعرفها في App*/ 
router.delete('/:bid/delete',BookController.delete)
module.exports= router

