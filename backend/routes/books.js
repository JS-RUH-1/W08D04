const express = require('express')
const book = require('../models/book')
const router = express.Router()

// get all books
router.get('/', async (req, res) => {
  res.json((await book.find({})));
})


module.exports = router