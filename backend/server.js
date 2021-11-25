const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

const authorsRouter = require("./routers/authorRoute");
const booksRouter = require("./routers/bookRoute");
const Book = require("./models/book");
const Author = require("./models/author");
const seedBook = require("./book_seed");
const seedAuthor = require("./author_seed");

require("dotenv").config();
// Mongoose Here
const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// msg when connect

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
// connect frontend
app.use(cors());
app.use(express.json());

app.use("/books", booksRouter);
app.use("/authors", authorsRouter);



app.listen(PORT, () => {
  console.log(`Connected on= http://localhost:${PORT}`);
});

//* commands for insert data into db */

// Book.insertMany(seedBook, (err, books) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("added provided books data", books);
//   // mongoose.connection.close();
// });

// Author.insertMany(seedAuthor, (err, authors) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("added provided authors data", authors);
//   //   mongoose.connection.close();
// });

let newTwoBooks = [
  {
    title: "AAAAAAAA",
    pages: 40,
    price: 15,
    image: "https://www.pngall.com/wp-content/uploads/2016/03/Book-PNG-3.png",
  },
  {
    title: "BBBBBBBB",
    pages: 60,
    price: 30,
    image: "https://www.pngall.com/wp-content/uploads/2016/03/Book-PNG-3.png",
  },
];
let newTwoAuthors = [
  {
    name: "Abdullah",
    age: 23,
    nationality: "Saudi",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcAstoK-v9kJ966uMGCV-i8zUssjaqdufbhg&usqp=CAU",
    gender: "male",
    books: [
      {
        title: "CCCC",
        pages: 150,
        price: 30,
        image:
          "https://www.pngall.com/wp-content/uploads/2016/03/Book-PNG-3.png",
      },
    ],
  },
  {
    name: "Hamad",
    age: 25,
    nationality: "Saudi",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcAstoK-v9kJ966uMGCV-i8zUssjaqdufbhg&usqp=CAU",
    gender: "male",
    books: [
      {
        title: "DDDDD",
        pages: 220,
        price: 50,
        image:
          "https://www.pngall.com/wp-content/uploads/2016/03/Book-PNG-3.png",
      },
    ],
  },
];

//* commands for insert new data into db */

// Book.insertMany(newTwoBooks, (err, books) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("added provided books data", books);
// mongoose.connection.close();
// });

// Author.insertMany(newTwoAuthors, (err, authors) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("added provided authors data", authors);
//     mongoose.connection.close();
// });

//select all authors

// Author.find({}, (err, authors) => {
//   console.log(authors);
//   mongoose.connection.close();
// });

// select all male authors

// Author.find({gender:"male"}, (err, authors) => {
//   console.log(authors);
//   mongoose.connection.close();
// });

// select all authors that age grater than 44

// Author.find({ age: { $gt: 40 } }, (err, authors) => {
//   console.log(authors);
//   mongoose.connection.close();
// });

// select all authors in Kuwait country

// Author.find({ nationality: "Kuwait" }, (err, authors) => {
//   console.log(authors);
//   mongoose.connection.close();
// });

// select all the books that start with L or l

// Book.find({title:/^l/i},(err,books)=>{
// console.log(books);
// mongoose.connection.close();
// })

// select all the books that have pages more than 250

// Book.find({pages:{$gt:250}},(err,books)=>{
// console.log(books);
// mongoose.connection.close();
// })

// select all authors that in Kuwait or Saudi Arabia

// Author.find(
//   { $or: [{ nationality: "Kuwait" }, { nationality: "Saudi Arabia" }] },
//   (err, authors) => {
//     console.log(authors);
//     mongoose.connection.close();
//   }
// );

// Find all authors that have 3 books or more and their age grater than 35
// Author.find(
//   {
//     $and: [{ books: { $size: 3 } }, { age: { $gt: 35 } }],
//   },
//   (err, authors) => {
//     if (err) console.log(err);
//     console.log(authors);
//     mongoose.connection.close();
//   }
// );

// Select by exists or does not exist -> Author do not have a key of age
// Author.find({ age: { $exists: false } }, (err, authors) => {
//   console.log(authors);
//   mongoose.connection.close();
// });

// Negative Selection->Author are not from Saudi Arabia
// Author.find({ nationality: { $ne: "Saudi Arabia" } }, (err, authors) => {
//   if (err) console.log(err);
//   console.log(authors);
//   mongoose.connection.close();
// });

// Update->Update Osama Al Muslim age to be 45
// Author.findOneAndUpdate({ name: "Abdullah" }, { age: 23 }, (err, authors) => {
//   if (err) console.log(err);
//   console.log(authors);
// });

//to check->
// Author.find({ name: "Abdullah" }, (err, authors) => {
//   console.log(authors);
//   mongoose.connection.close();
// });

// Remove->Remove all book that have price less than 50
// Book.deleteMany({ price: { $lt: 50 } }, (err, books) => {
//   console.log(books);
//   mongoose.connection.close();
// });

//to check->
// Book.find({}, (err, books) => {
//   console.log(books);
//   mongoose.connection.close();
// });
