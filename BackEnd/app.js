let express = require('express')
const cors = require('cors')
let mongoose = require("mongoose"),

app = express()
const router = require("./routes/index")

app.use(cors())

const User = require('./models/user')
const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const passport = require('passport')


mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/blogs",{ 
    useUnifiedTopology:true ,  
    useNewUrlParser:true
    
});


// mongoose.set('useNewUrlParser',true)
// mongoose.set('useFindAndModify',false)
// mongoose.set('useCreateIndex',true)


app.use(cookieParser('myblog'))
app.use(expressSession({

    secret: 'myblog',
    saveUninitialized:true,
    resave:true,
    cookie:{maxAge : 6000}

}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())




app.use(express.json())
app.use("/",router)


app.listen(3030,()=>{
    console.log("express has started !")
})