
const authors=require('./routes/author')
// طريقة الاتصال بالمونقو 1
// const uri = 'mongodb+srv://Mushira:Ms0503391650@cluster0.nujs7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// mongoose.connect(uri, {
// useNewUrlParser: true, useUnifiedTopology: true
// });
// const connection = mongoose.connection
// connection.once('open', () => console.log('Connected to DB'),
// connection.on('disconnected', () => console.log('mongo disconnected')),
// connection.on('error', err => {console.log('connection error', err)}))
let express =require('express')
let mongoose=require('mongoose')
app =express()
const router = require('./routes/index')
app.use('/api/author',authors)

mongoose.Promise = global.Promise
// طريقة الاتصال بالمونقو 2
mongoose.connect('mongodb+srv://Mushira:Ms0503391650@cluster0.nujs7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true
})

app.use(express.json())  /* عشان تستقبل بيانات بشكل جيسون لاننا في التحديث بنرسل البيانات على شكل جيسون*/ 
app.use('/' , router)

app.listen(3001, ()=>{
    console.log("express has started!")
})
