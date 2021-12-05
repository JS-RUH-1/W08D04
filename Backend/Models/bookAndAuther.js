const mongoose = require ("mongoose")
const Schema = mongoose.Schema;
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const BookSchema = new Schema({
    title: { type: String, required: [true, "Book title should be provided"]},
    pages: { type: Number, required: [true, "Book pages should be provided"]},
    price: { type: Number, default: 0},
    image: { type: String, required: [true, "Book image should be provided"]}
})

const AuthorSchema = new Schema({
    name: { type: String  ,required: [true, "Author name should be provided"]},
    age: { type: Number},
    nationality: { type: String ,required: [true, "Author nationality should be provided"]},
    image: { type: String , required: [true, "Author image should be provided"]},
    gender: { type: String },
    email: { 
        type: String,
        required: [true, "please enter an email"], 
        unique: true, 
        lowercase: true,
        validate: [isEmail, 'please enter a valid email']
     },
    password: { 
        type: String, 
        required: [true, "please enter an password"]},
    books: [BookSchema]
})

// fire a function after doc saved to db
AuthorSchema.post('save', function (doc,next) {
    console.log('new user was created and save', doc);
    next();
})

// fire a function before doc saved to db
AuthorSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next();
})

AuthorSchema.statics.login = async function (email,password) {
    const user = await this.findOne({email});
    if (user){
      const auth = await bcrypt.compare(password, user.password)
        if (auth){
            return user;
        }
        throw Error ('incorrect password')
    }
    throw Error ('incorrect email')
}

const Author = mongoose.model('auther', AuthorSchema);
const Book = mongoose.model('book', BookSchema);
module.exports ={Book,Author}