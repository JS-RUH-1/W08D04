const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    title:{
      type: String,
      required: [true, 'Book title should be provided']
    },
    image: {
      type: String,
      required: [true, 'Book image should be provided']
    },
    price: Number,
    pages: {
      type: Number,
      required: [true, 'Book pages should be provided']
    },
    author_id: {
      type: String,
      required: [true, 'Author id should be provided']
    },
  });