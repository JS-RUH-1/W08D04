const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let bookSchema = require("./book");

let AuthorSchema = new Schema({
  name: { type: String, required: [true, "Author name should be provided"] },
  age: Number,
  nationality: {
    type: String,
    required: [true, "Author nationality should be provided"],
  },
  image: {
    type: String,
    required: [true, "Author image should be provided"],
  },
  gender: String,
  books: Array,
});
const Author = mongoose.model("Author", AuthorSchema);
module.exports = Author;
