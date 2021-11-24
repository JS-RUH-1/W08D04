const express = require('express')
const author = require('../models/author')
const router = express.Router()

// get all authors
router.get('/', async (req, res) => {
  res.json((await author.find({})));
});

// get one author
router.get('/:id', async (req, res) => {
  res.json((await author.find({_id: req.params.id})));
});

// add author
router.post('/', async (req, res) => {
  res.json((await author.insertOne(req.body)));
});

// edit author
router.put('/', async (req, res) => {
  res.json((await author.updateOne(req.body)));
});

module.exports = router