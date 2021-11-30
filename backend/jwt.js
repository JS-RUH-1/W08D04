const SECRET_TOKEN = "THIS-IS-JUST-A-SECRET-HOMEWORK-MAHA";
const jwt = require('jsonwebtoken');
const AuthorModel = require('./models/author');

const generateAccessToken = (author_id) => {
    return jwt.sign(author_id, SECRET_TOKEN);
}


////////////////////////////////////////////////////////////////
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (!token) return res.status(401).json({error: "Wrong auth"});
    //----------------------
    jwt.verify(token, SECRET_TOKEN, async (err, author_id) => {
      //console.log(err);
      if (err) return res.sendStatus(403)
      req.author = await AuthorModel.findOne({_id:author_id },{password:0});
      if(!req.author) req.author = []; 
      
      next()
    });

  }

  module.exports = {generateAccessToken, authenticateToken};