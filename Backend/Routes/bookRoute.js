const express = require('express');
const { Book } = require('../Models/bookAndAuther');
const router = express.Router();
router.use(express.json())
router.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  
    next();
  });


// GET


router.get ( '/getBook', async (request,response) => {
    try {
        const books = await Book.find()
        response.send(books)
    }
    catch(e) {
        response.status(500).send()
        console.error(e)
    };
})


// POST

router.post ( '/createBook', async (request,response) => {

    const createB = new Book ({
        title: request.body.data.title,
        pages: request.body.data.pages,
        price: request.body.data.price,
        image: request.body.data.image,
    })
    console.log(createB);

    try {
        await createB.save()
        response.status(201)
        const books = await Book.find()
        response.send(books)
    }
    catch(e) {
        console.error(e)
    }
    console.log("Add");
})

// UPDATE

router.put('/updateBook/:id', async (request,response)=> {
    const allowedUpdates = ['title', 'pages', 'price', 'image'];
    const updates = Object.keys(request.body.data)
    const isValidOperation  = updates.every((update)=> allowedUpdates.includes(update))
 
    if(!isValidOperation) {
        return response.status(400).send({erro: 'Invalid updates'});
    }
    try {
        const book = await Book.findOne({_id: request.params.id});

        if(!book) {return response.status(404).send(404).send()}
        updates.forEach((update)=> {
            book[update] = request.body.data[update]
        })
        await book.save()
        response.status(200)
        const books = await Book.find()
        response.send(books)
 
    } catch(e){
        response.status(400).send(e)
        console.error(e)
    }
 })
 


// DELETE

router.delete ( '/deleteBook/:id', async (request,response) => {
    try {
        const books = await Book.findByIdAndDelete({_id:request.params.id})
        if (!books) {
            return response.status(404).send()
        }
        const books_ = await Book.find()
        response.send(books_)
    }
    catch(e) {
        response.status(500).send()
        console.error(e)
    };
})



module.exports = router;