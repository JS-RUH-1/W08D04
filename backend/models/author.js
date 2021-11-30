const { Schema, model } = require("mongoose");
const Book = require('./book');
const {isEmail} = require("validator");
module.exports = model('Author', new Schema({ 
    email: {
        type: String,
        required: [true, "email should be provided"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "email is invaild"]
    },
    password: String,
    name: {
        type: String,
        required: [true, "Author name should be provided"]
    },
    age: Number,
    nationality: {
        type: String,
        required: [true, "Author nationality should be provided"]
    },
    image: {
        type: String,
        required: [true, "Author image should be provided"]
    },
    gender: String,
    books: [Book.schema]
 }))