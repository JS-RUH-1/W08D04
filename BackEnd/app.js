const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
const app = express()
const router = require("./routes/index")

app.use(cors())

mongoose.Promise = global.Promise

mongoose.connect("mongodb://localhost:27017/blogs",{ 
    useNewUrlParser:true,
    useUnifiedTopology:true,
})


app.use(express.json())
app.use("/",router)


app.listen(3030,()=>{
    console.log("express has started !")
})