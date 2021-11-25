const express = require('express')
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
router.post('/', async (req, res) => {
  res.json((await book.insertOne(req.body)));
});

// edit book
router.put('/:id', async (req, res) => {
  res.json((await book.updateOne({_id: req.params.id},{$set: req.body})));
});

// delete book
router.delete('/:id', async (req, res) => {
  res.json((await book.deleteOne({_id: req.params.id})));
});


module.exports = router