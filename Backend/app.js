const express = require("express");
const app = express();
const PORT = 3001;
const mongoose = require("mongoose");
const seedBook = require("./book_seed");
const seedAuthor = require("./author_seed");
const Author = require("./Models/bookAndAuther").Author;
const Book = require("./Models/bookAndAuther").Book;
const AutherRoute = require ("./Routes/autherRoute")
const BookRoute = require('./Routes/bookRoute')
const cors = require("cors")


app.use('/book', BookRoute)
app.use('/author',AutherRoute)
app.use(cors())

const uri = 'mongodb+srv://NouraSaad:NNooorraaa123@cluster0.qhmyx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection
connection.once('open', () => console.log('Connected to DB'),
connection.on('disconnected', () => console.log('mongo disconnected')),
connection.on('error', err => {console.log('connection error', err)}))

app.listen(PORT, () => {
    console.log(`Connected on= http://localhost:${PORT}`);
  });


