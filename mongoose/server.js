const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;
const authors = require('./router/authors')
const books = require('./router/books')
const mongoose = require('mongoose');
const seedAuthor = require('./author_seed')
const AuthorSchema = require("./AuthorSchema");



app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json());

app.use('/authors', authors)
app.use('/books', books)


app.listen(PORT, () => {
  console.log(`Connected on= http://localhost:${PORT}`);
});



// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/test');
// }

// const Author = mongoose.model('Author', AuthorSchema);
// const Book = mongoose.model('Book', BookSchema);

// Book.insertMany(seedBook, (err, books) => {
//   if (err){ console.log(err)}
//     console.log("added provided books data", books)
//   });

// Author.insertMany(seedAuthor, (err, books) => {
//   if (err){ console.log(err)}
//     console.log("added provided authors data", books)
// });

// Author.find({gender: 'male'}, (err, authors) => {
//   authors.map((author)=>{
//     console.log(author.gender)
//   })
// }); 

// Author.find({ age: { $gt: 44}}, (err, authors) => {
//   authors.map((author)=>{
//     console.log(author.age)
//   })  
// }); 

// Author.find({ nationality: 'Kuwait' }, (err, authors) => {
//   authors.map((author)=>{
//     console.log(author.nationality)
//   }) 
// }); 


// Author.find({ age: { $exists: false } }, (err, authors) => {
//   authors.map((author)=>{
//     console.log(author.name)
//   }) 
// }); 

// Author.find({ $or: [{ nationality: 'Kuwait'  }, { nationality: 'Saudi Arabia' }] }, (err, authors) => {
//   authors.map((author)=>{
//     console.log(author.nationality)
//   }) 
// }); 

// Author.find({ $and: [{ age: { $gt: 35 }  }, { books: { $size: 3 } }] }, (err, authors) => {
//   authors.map((author)=>{
//     console.log(author)
//   }) 
// }); 


// Book.find({ pages: { $gt: 250}}, (err, books) => {
//   books.map((book)=>{
//     console.log(book.pages)
//   })   
// }); 


// Author.find( { nationality: { $not: { $regex: 'Saudi Arabia'  } } }, (err, authors) => {
//   authors.map((author)=>{
//     console.log(author.nationality)
//   }) 
// }); 


// Author.findOneAndUpdate({ name: 'Osama Al Muslim' }, { age: 45 }, () => {
//     console.log('updated')
// }); 

// Book.deleteMany({ price: { $lt: 50}}, (err, books) => {
//   console.log('deleted')
// }); 
