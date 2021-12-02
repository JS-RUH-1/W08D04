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
    console.log("added")
})
// _______________________________________________________لحذف كتاب لمؤلف محدد 
router.delete('/book/:authorId/:bookId',
async(req , res)=>{
    const bookId =req.params.bookId;
    try{
        const author =await Author.findById(req.params.authorId);
        if(!author){
            return res.status(404).send();
        } 
        await author.books.pull({_id:bookId});
        await author.save()
        res.status(201).send(author)

    }catch (e){
        res.status(500).send();
        console.error(e)

    }
}
)
// _________________________________________________________
router.put('/bookUpdate/:author/:_id',async (req,res)=>{
Author.update({'books._id':req.params._id},{'$set': {
'books.$.title' : req.body.title,
'books.$.pages': req.body.pages,
'books.$.price':req.body.price,
'books.$.image':req.body.image
}},
function(err){
    if (err){
        console.log(err)
        return res.send(err)
    }
    
})

const author =await Author.findById(req.params.author)
    res.status(201).send(author)

    
})

module.exports= router