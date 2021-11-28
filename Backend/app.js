const mongoose = require('mongoose');
const Book = require("./Models/bookAndAuther").Book
const Auther = require("./Models/bookAndAuther").Auther
const cors = require('cors')
const express = require("express")
const app = express()
const authorRouter = require('./Routes/authorRoutes')
const bookRouter = require('./Routes/bookRoutes')

app.use(cors())
app.use('/author',authorRouter)
app.use('/books',bookRouter)


const uri = 'mongodb+srv://alanoud:1418@cluster0.anylu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true, useUnifiedTopology: true
});

const connection = mongoose.connection
connection.once('open', () => console.log('Connected to DB'),
connection.on('disconnected', () => console.log('mongo disconnected')),
connection.on('error', err => { console.log('connection error', err) }))


const PORT = process.env.PORT || 3001
app.listen(PORT, ()=>{
  console.log(`Server running on http://localhost:${PORT}/`)
})