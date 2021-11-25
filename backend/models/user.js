const mongoose = new require('mongoose'),
{Schema} = mongoose

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

module.exports = mongoose.model('User',UserSchema);