const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;
const authors = require('./router/authors')
const books = require('./router/books')
const users = require('./router/users')
const mongoose = require('mongoose');


main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}

app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json());

app.use('/authors', authors)
app.use('/books', books)
app.use('/users', users)


app.listen(PORT, () => {
  console.log(`Connected on= http://localhost:${PORT}`);
});