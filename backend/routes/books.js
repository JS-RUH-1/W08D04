const express = require('express');
const { authenticateToken } = require('../base/jwt');
const Author = require('../models/author');
const Book = require('../models/book')
const router = express.Router()

// get all books
router.get('/', async (req, res) => {
  res.json((await Book.find({})));
});

// get one book
router.get('/:id', async (req, res) => {
  res.json((await Book.findOne({_id: req.params.id})));
});

// add book
router.post('/',authenticateToken, async (req, res) => {
  try {
    console.log(req.body);
    let book = await Book.create(req.body);
   await Author.updateOne({_id: req.user._id}, {$push: {books : book}});
   res.json(book);

  } catch (err) {
    console.log(err);
    res.status(500).json({"message": err.toString()});
  }
});

// edit book
router.put('/:id',authenticateToken, async (req, res) => {
  if(!req.user.books.some(b => String(b._id) === req.params.id)) return res.status(400).json({error:"Author not allowed to edit this book"})
  res.json((await Book.updateOne({_id: req.params.id},{$set: req.body})));
});

// delete book
router.delete('/:id',authenticateToken, async (req, res) => {
  if(!req.user.books.some(b => String(b._id) === req.params.id)) return res.status(400).json({error:"Author not allowed to edit this book"})
  res.json((await Book.deleteOne({_id: req.params.id})));
});


module.exports = router