const mongoose = require('mongoose'),
{Schema} = mongoose
const { isEmail } = require('validator');
const bcrypt = require('bcrypt')

 const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Book title should be provided"]
    },
    pages: {
        type: Number,
        required: [true, "Book pages should be provided"]
    },
    price: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: [true, "Book image should be provided"]
    }
    // ,
    // authorId:{
    //     type: Schema.Types.ObjectId, ref: 'Author'
    // }
});



 const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        required: [true, "Author name should be provided"]
    },
    email: {
        type: String,
        trim:true,
        required: [true, "Author email should be provided"],
        unique: true,
        lowercase: true,
        validate:[isEmail,"Author email should be in a legit email format"]
    },
    password: {
        type: String,
        required: [true, "Author password is required"],
        minlength: [6,"Author password should be larger than 5"],
        maxlength: [20,"Author password should be smaller than 21"]
    },
    nationality: {
        type: String,
        trim:true,
        required: [true, "Author nationality should be provided"]
    },
    image: {
        type: String,
        trim:true,
        required: [true, "Author image should be provided"]
    },
    age: { 
        type:Number,
        trim:true,
    },
    gender: {
        type:String,
        trim:true
    },
    books : [bookSchema]
});

authorSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next();
  });

authorSchema.statics.login = async function(email,password) {
    const author = await this.findOne({email});
    console.log('author in authorSchema.statics.login equals',author)
    if(author){
        const auth = await bcrypt.compare(password,author.password)
        if(auth){
            return author
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}

const Book = mongoose.model('Book', bookSchema);
const Author = mongoose.model('Author', authorSchema);

module.exports={Book , Author}