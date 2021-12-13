const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

const authorRoute = require('./routes/author');
const bookRoute = require('./routes/book');
const userRoute = require('./routes/user');

// if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
// }

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/backend/authors',authorRoute)
app.use('/backend/books',bookRoute)
app.use('/backend/users',userRoute)// USELESS, this route is not used

app.get('/set',(req,res)=>{
  res.cookie('dodo dada','dede')
  res.send('You got it!!!')
})
// app.get('/read',(req,res)=>{
//   const currCookies = req.cookies;
//   console.log(currCookies)
//   res.send(currCookies)
// })

mongoose.connect(
    "mongodb+srv://12345:54321@cluster0.svcmm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true//, useCreateIndex:true 
  }).then(()=>app.listen(8000,()=>{console.log("CONNECTED WITH MONGO AND SERVER HAS STARTED")})).catch((err)=>console.log("error Connecting with mongo",err))

