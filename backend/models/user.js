const mongoose = new require('mongoose'),
{Schema} = mongoose

// passportLocalMongoose is a library in npm (تسهل عملية signup , sign in)  
const passportLocalMongoose = require('passport-local-mongoose')
const UserSchema = new Schema ({
    name:{
        type:String,
        trim:true,
        required: [true, "User name should be provided"]
        }, 


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
UserSchema.plugin(passportLocalMongoose,{
    usernameField = 'email'
})
module.exports = mongoose.model('User',UserSchema);