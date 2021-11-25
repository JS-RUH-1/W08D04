const express = require('express')
const author = require('../models/author')
const router = express.Router()

// get all authors
router.get('/', async (req, res) => {
  res.json((await author.find({})));
});

// get one author
router.get('/:id', async (req, res) => {
  res.json((await author.findOne({_id: req.params.id})));
});

// add author
router.post('/', async (req, res) => {
  res.json((await author.insertOne(req.body)));
});

// edit author
router.put('/:id', async (req, res) => {
  res.json((await author.updateOne({_id: req.params.id}, {$set: req.body})));
});

// delete author
router.delete('/:id', async (req, res) => {
  res.json((await author.deleteOne({_id: req.params.id})));
});

module.exports = router