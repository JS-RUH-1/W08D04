const mongoose = require('mongoose');

 const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username should be provided"]
    },
    password: {
        type: String,
        required: [true, "password should be provided"]
    }
});

const User = mongoose.model('User', userSchema);

module.exports = {User}