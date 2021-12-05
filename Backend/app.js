const express = require("express");
const app = express();
const PORT = 3001;
const mongoose = require("mongoose");
const Author = require("./Models/bookAndAuther").Author;
const Book = require("./Models/bookAndAuther").Book;
const AutherRoute = require ("./Routes/autherRoute")
const BookRoute = require('./Routes/bookRoute')
const cors = require("cors")
const authRoutes = require('./Routes/authRoute')
const cookieParser = require('cookie-parser')
const {requireAuth, checkUser} = require('./middleware/authMiddleware')



app.use(cors())
app.use('/book', BookRoute)
app.use('/author',AutherRoute)
app.use(authRoutes)
app.use(requireAuth)
app.use(express.json())
app.use(cookieParser())

app.get('*',checkUser);

// COOKEIES
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


const uri = 'mongodb+srv://NouraSaad:NNooorraaa123@cluster0.qhmyx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection
connection.once('open', () => console.log('Connected to DB'),
connection.on('disconnected', () => console.log('mongo disconnected')),
connection.on('error', err => {console.log('connection error', err)}))

app.listen(PORT, () => {
    console.log(`Connected on= http://localhost:${PORT}`);
  });


