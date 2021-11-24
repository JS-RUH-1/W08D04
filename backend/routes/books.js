const express = require('express')
const book = require('../models/book')
const router = express.Router()

// get all books
router.get('/', async (req, res) => {
  res.json((await book.find({})));
});

// get one author
router.get('/:id', async (req, res) => {
  res.json((await book.find({_id: req.params.id})));
});

// add author
router.post('/', async (req, res) => {
  res.json((await book.insertOne(req.body)));
});

// edit author
router.put('/', async (req, res) => {
  res.json((await book.updateOne(req.body)));
});


module.exports = router