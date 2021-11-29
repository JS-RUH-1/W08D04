const express = require('express');
const { authenticateToken } = require('../base/jwt');
const Author = require('../models/author');
const book = require('../models/book')
const router = express.Router()

// get all books
router.get('/', async (req, res) => {
  res.json((await book.find({})));
});

// get one book
router.get('/:id', async (req, res) => {
  res.json((await book.findOne({_id: req.params.id})));
});

// add book
router.post('/',authenticateToken, async (req, res) => {
  try {
    let book = await book.create(req.body);
    Author.updateOne({_id: req.user._id}, {$push: {books : book._id}});
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit book
router.put('/:id',authenticateToken, async (req, res) => {
  if(!req.user.books.includes(req.params.id)) return res.status(400).json({error:"Author not allowed to edit this book"})
  res.json((await book.updateOne({_id: req.params.id},{$set: req.body})));
});

// delete book
router.delete('/:id',authenticateToken, async (req, res) => {
  if(!req.user.books.includes(req.params.id)) return res.status(400).json({error:"Author not allowed to delete this book"})
  res.json((await book.deleteOne({_id: req.params.id})));
});


module.exports = router