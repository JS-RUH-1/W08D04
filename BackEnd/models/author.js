const mongoose = require('mongoose')

 const Schema= mongoose.Schema
 const passportLocalMongoose = require('passport-local-mongoose')

const bookSchema= require('./book').schema

 const AuthorSchema = new Schema({

        name:{
            type:String,
            required:[true,"Author name should be provided"]
        },
        email:{
            type: String,
            required:[true,"Email should be provided"],
            unique: true
        },
        age:{ 
            type:String,
        },
        nationality:{
            type:String,
            required:[true,"Author nationality should be provided"]

        },
        image:{
            type:String,
        required:[true,"Author image should be provided"]
                
        },
        gender:{

            type:String,
        },

        // books:[bookSchema]

        })

 AuthorSchema.plugin(passportLocalMongoose ,{
  usernameField:'email'
        })

module.exports = mongoose.model("Author",AuthorSchema)
