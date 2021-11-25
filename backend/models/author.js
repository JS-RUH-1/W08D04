const mongoose = new require('mongoose'),
{Schema} = mongoose


// passportLocalMongoose is a library in npm (تسهل عملية signup , sign in)  
const passportLocalMongoose = require('passport-local-mongoose')

const Book = require('./book')
const AuthorSchema = new Schema ({
    name:{
        type:String,
        trim:true,
        required: [true, "Author name should be provided"]
        }, 
    age: Number,

    nationality: {
        type: String,
        required: [true, "Author nationality should be provided"]
    },
    image: {
        type: String,
        required: [true, "Author image should be provided"]
    },
    gender: String,
    books:[Book.schema],
    
    email: {
        type: String,
        trim:true,
        unique: true,
        required: [true, "Email should be provided"]
    }
})

//passportLocalMongoose  تسمح بتعريف معلومات اليوزر 
//plugin to user model 
//2nd arrgument => authentication اعطيه الايميل كيوزر نيم فيلد لعملية 
AuthorSchema.plugin(passportLocalMongoose,{
    usernameField : 'email'
})

module.exports = mongoose.model('Author',AuthorSchema);