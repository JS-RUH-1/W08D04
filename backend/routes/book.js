const router = require("express").Router(),
BookController= require('../controllers/book')
const Author = require('../Models/AuthorSchema')
const Book = require ('../Models/BookSchema')

router.get('/', BookController.index )
// show books by id 
router.get('/:bid',BookController.show)
router.put('/:bid/update',BookController.update) /* هنا بيكون التحديث على صيغة جيسون عشان كذا لازم نعرفها في App*/ 
router.delete('/:bid/delete',BookController.delete)

router.post('/book/:id' , async(req,res)=>{
    const _id = req.params.id
    const author = await Author.findOne({_id}); 
    const newBook = new Book ({title:req.body.title,pages:req.body.pages,price:req.body.price , image: req.body.image})
    author.books.push(newBook)
    console.log(author)
    try{
        await author.save()
        res.status(201).send(author)
    }
    catch(e){
        console.error(e)
    }
    console.log(added)
})
module.exports= router