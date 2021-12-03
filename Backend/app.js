const mongoose = require('mongoose');
const Book = require("./Models/bookAndAuther").Book
const Auther = require("./Models/bookAndAuther").Auther
const cors = require('cors')
const express = require("express")
const app = express()
const authorRouter = require('./Routes/authorRoutes')
const bookRouter = require('./Routes/bookRoutes')
const authRoutes = require('./Routes/authRoutes')
const cookieParser = require('cookie-parser')
const {requireAuth, checkUser} = require('./middleware/authMiddleware')

app.use(cors())
app.use('/author',authorRouter)
app.use('/books',bookRouter)
app.use(authRoutes)
app.use(requireAuth)
app.use(express.json())
app.use(cookieParser())
app.get('*',checkUser)

// COOKIES
app.get('/set-cookies', (request,response) => {
  //response.setHeader('set-Cookies', 'newUser = true');
    response.cookie('newUser', false)
    response.send('you got the cookies!')
  });
  app.get('/read-cookies', (request,response) => {
    const cookies = request.cookies;
    console.log(cookies.newUser);
    response.json(cookies)
  })

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