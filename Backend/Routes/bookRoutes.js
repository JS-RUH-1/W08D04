const express = require('express')
const { Book } = require('../Models/bookAndAuther')
const bookRouter = express.Router()

bookRouter.use(express.json())

bookRouter.get('/getBooks', async (req,res) => {
    const allBooks = await Book.find()
    res.send(allBooks)
})

bookRouter.post('/postBook', (req, res) => {
    const newBook = new Book ({
       title: req.body.title,
       pages: req.body.pages,
       price: req.body.price,
       image: req.body.image
    })

    newBook.save()
    .then(res => { console.log(res)})
    .catch(err => {console.log(err)})
})

bookRouter.put('/updateBook/:id', async (req, res) => {
    const updateBook = await Book.findByIdAndUpdate(req.params.id, { $set: req.body })
    res.send(updateBook)
})

bookRouter.delete('/deleteBook/:id', async (req, res) => {
    const deleteBook = await Book.findByIdAndDelete(req.params.id)
    res.send(deleteBook)
})

module.exports = bookRouter