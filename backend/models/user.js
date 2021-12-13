
const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email should be provided"],
        unique:[true,"This Email already been used"]
    },
    password:{
        type:String,
        required:[true,"password should be provided"]
    }
})
const User = mongoose.model('User',userSchema)
module.exports={User}