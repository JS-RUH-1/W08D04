const express = require('express');
const authorRouter = require('./routes/author');
const bookRouter = require('./routes/book');

const cors = require('cors');
const mongoose = require('mongoose');

const BookSeed = require('./book_seed');
const AuthorSeed = require('./author_seed');
const app = express();
const port = 4000;

app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json())



/*
Books.insertMany(BookSeed, (err, res) => {
    if(err){ console.log(err)}
    mongoose.connection.close;
})

Authors.insertMany(AuthorSeed, (err, res) => {
    if(err){ console.log(err) }
    mongoose.connection.close;
})
*/


app.use('/',bookRouter)
app.use('/', authorRouter)
app.use('/getBooks', bookRouter);

app.use('/getAuthors', authorRouter);

app.get('/userBooks', bookRouter);

app.use('/addBook', bookRouter);

app.use('/updateBook', bookRouter);

app.use('/deleteBook', bookRouter);

app.use('/addAuthor', authorRouter);

app.use('/updateAuthor', authorRouter);

app.use('/deleteAuthor', authorRouter);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})

module.exports = app;