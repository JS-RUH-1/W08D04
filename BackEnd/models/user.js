const mongoose = require('mongoose')

const Schema=mongoose.Schema
// {Shema} =mongoose
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema =new Schema({

    name:{
        type: String,
        required:[true,"Name should be provided"]
    },
    age:{
        type: Number,
        required:[true,"Number should be provided"]
    },
    email:{
        type: String,
        required:[true,"Email should be provided"],
        unique: true
    }
    })



    UserSchema.plugin(passportLocalMongoose ,{
        usernameField:'email'
    })
 
module.exports = mongoose.model("User",UserSchema)
