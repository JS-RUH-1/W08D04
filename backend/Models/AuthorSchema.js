const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {isEmail}= require('validator')
const bcrypt = require('bcrypt')

const bookSchema = require('./BookSchema').schema
const Author = new Schema ({
    name :{
        type :String,
        // required:[true , "can't be blank"]
    },
    age :Number ,
    nationality :{
        type : String,
        // required:[true , "can't be blank"]
    },
    image:{
        type:String,
        // required:[true , "can't be blank"]
    },
    gender :String,
    books:[bookSchema],
    email:{
        type:String,
        required:[true,"email should be provided"],
        unique:true,
        validate :[isEmail, "Please enter an email"],
    },
    password:{
        type:String,
        minlength:[6,"Minimum passlingth is 6"],
        required:[true,"Please enter an password"]
    }
})

// // fire a function after doc saved to db
Author.post('save', function(doc,next){
console.log('new user was created & saved', doc);
next();
})

// fire a function before doc saved to db
Author.pre('save', async function (next){
    // console.log('user about to be created $ saved',this );
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password , salt)
    next();
})
// static method to login user
Author.statics.login = async function(email, password){
    const user = await this.findOne({email})
    if (user){
      const auth= await bcrypt.compare(password, user.password)
      if(auth){
          return user;
      }
      throw Error('incorrect password')

    }
    throw Error('incorrect email')
}


module.exports= mongoose.model('Author',Author)