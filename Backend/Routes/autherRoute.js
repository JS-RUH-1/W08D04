const express = require('express');
const { Author, Book } = require('../Models/bookAndAuther');
const router = express.Router();
router.use(express.json())
router.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE,PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  
    next();
  });



// GET


router.get ( '/getAuthor', async (request,response) => {
    try {
        const authors = await Author.find()
        response.send(authors)
    }
    catch(e) {
        response.status(500).send()
        console.error(e)
    };
})

// GET Specific Author

router.get ( '/getAuthor/:id', async (request,response) => {
    const _id = request.params.id
    try {
        const authors = await Author.findOne({_id})
        response.send(authors)
    }
    catch(e) {
        response.status(500).send()
        console.error(e)
    };
})

// POST

router.post ('/createAuthor', async (request,response) => {
  
    const createA = new Author ({
        name: request.body.data.name,
        age: request.body.data.age,
        nationality: request.body.data.nationality,
        image: request.body.data.image,
        gender: request.body.data.gender,
        // books:  request.body.data.books
    })
    console.log(createA);

    try {
        await createA.save()
        response.status(201)
        const authors = await Author.find()
        response.send(authors)
    }
    catch(e) {
        console.error(e)
    }
    console.log("Add");
})

// POST

router.post ('/createBook/:id', async (request,response) => {
  const author= await Author.findById(request.params.id)
    const createBook = new Book ({
        title: request.body.data.title,
        pages: request.body.data.pages,
        price: request.body.data.price,
        image: request.body.data.image,
    })
    console.log(createBook);
    author.books.push(createBook)
    try {
        await author.save()
        response.status(201)
        // const authors = await Author.find()
        response.send(author)
    }
    catch(e) {
        console.error(e)
    }
    console.log("Add");
})




// UPDATE

router.put('/updateAuther/:id', async (request,response)=> {
    const allowedUpdates = ['name', 'age', 'nationality', 'image', 'gender', 'books'];
    const updates = Object.keys(request.body.data)
    const isValidOperation  = updates.every((update)=> allowedUpdates.includes(update))
 
    if(!isValidOperation) {
        return response.status(400).send({erro: 'Invalid updates'});
    }
    try {
        const author = await Author.findOne({_id: request.params.id});

        if(!author) {return response.status(404).send(404).send()}
        updates.forEach((update)=> {
            author[update] = request.body.data[update]
        })
        await author.save()
        response.status(200)
        // const authors = await Author.find()
        response.send(author)
 
    } catch(e){
        response.status(400).send(e)
        console.error(e)
    }
 })
 


// DELETE

router.delete ( '/deleteAuther/:id', async (request,response) => {
    try {
        const author = await Author.findByIdAndDelete({_id:request.params.id})
        if (!author) {
            return response.status(404).send()
        }
        const authors = await Author.find()
        response.send(authors)
    }
    catch(e) {
        response.status(500).send()
        console.error(e)
    };
})


router.delete ('/deleteBook/:idAuth/:idBook', async (request,response) => {
     const bookId = request.params.idBook;
      try {
        const author= await Author.findById(request.params.idAuth)
         if (!author){
            return response.status(404),send()
         }
         await author.books.pull({_id: bookId})
         await author.save()
         response.status(201).send(author)
      }
      catch(e) {
          response.status(500).send();
          console.error(e)
      }
  })
  



module.exports = router;