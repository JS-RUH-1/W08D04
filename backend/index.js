const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const books = require('./routes/books');
const authors = require('./routes/authors');
const app = express()
const port = 8080;
mongoose.connect('mongodb+srv://riyadhtickets:T123123123@cluster0.tn6wn.mongodb.net/W08D03HW?authSource=admin&retryWrites=true&w=majority');

app.use(cors());
app.use('/books', books);
app.use('/authors', authors);


app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



const Author = require('./models/author');
const Book = require('./models/book');
