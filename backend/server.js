

// طريقة الاتصال بالمونقو 1
// const uri = 'mongodb+srv://Mushira:Ms0503391650@cluster0.nujs7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// mongoose.connect(uri, {
// useNewUrlParser: true, useUnifiedTopology: true
// });
// const connection = mongoose.connection
// connection.once('open', () => console.log('Connected to DB'),
// connection.on('disconnected', () => console.log('mongo disconnected')),
// connection.on('error', err => {console.log('connection error', err)}))
// _________________________________________________________________________
const authors=require('./routes/author')
let express =require('express')
let mongoose=require('mongoose')
app =express()
const router = require('./routes/index')
const cors = require("cors")
const userRoute = require('./routes/userRoute')
const cookieParser = require('cookie-parser')
const {requireAuth , checkUser} = require('./middleware/authMiddleware');


app.use('/api/author',authors)
app.use(cors());
mongoose.Promise = global.Promise
// طريقة الاتصال بالمونقو 2
mongoose.connect('mongodb+srv://Mushira:Ms0503391650@cluster0.nujs7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true
})

app.use(express.json())  /* عشان تستقبل بيانات بشكل جيسون لاننا في التحديث بنرسل البيانات على شكل جيسون*/ 
app.use('/' , router)

app.use(cookieParser());
// ____________________________________________________user
// routes
// app.get('*',checkUser)
// app.get('/',requireAuth,(req,res)=>res.render('Author'));
// app.get('/smoothies', requireAuth,(req,res)=>res.render('smoothies'))
app.use(userRoute);

// cookies
app.get('/set-cookies',(req,res)=>{
    // res.setHeader('Set-Cookie','newUser=true');

res.cookie('newUser', false)

    res.send ('you got the cookies !')
})

app.get('/read-cookies',(req,res)=>{
    const cookies =req.cookies
    console.log(cookies)
    res.json(cookies)

})

// ____________________________________________________

app.listen(3001, ()=>{
    console.log("express has started!")
})
