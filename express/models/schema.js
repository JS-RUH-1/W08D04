let mongoose = require("mongoose");
const { Schema } = mongoose;


const bookSchame = new Schema({
  title: {
    type: String,
    required: ["Book title should be provided"],
  },
  pages: {
    type: Number,
    required: ["Book pages should be provided"],
  },
  price: {
    type: Number,
    default: 0,
  },
  bookImage: {
    type: String,
    required: ["Book image should be provided"],
  },
});

const authorSchame = new Schema({
  name: {
    type: String,
    required: ["Author name should be provided"],
  },
  age: {
    type: Number,
  },
  nationality: {
    type: String,
    required: ["Author nationality should be provided"],
  },
  autherImage: {
    type: String,
    required: ["Author image should be provided"],
  },
  gender: {
    type: String,
  },
  books: [bookSchame],
  
  email: {
    type: String,
    required: [true, "Email should be provided"],
    unique: true,
  },
  password: {
    type: String,
    minlength: [6, "pass more then 6"],
    required: [true, "pass should be provided"],
  }
});


const Book = mongoose.model("Book", bookSchame);
const Author = mongoose.model("Author", authorSchame);


module.exports = { Book, Author };
