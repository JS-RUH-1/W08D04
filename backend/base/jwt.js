const SECRET_TOKEN = "THIS-IS-JUST-A-SECRET-EMAD";
const jwt = require('jsonwebtoken');
const Author = require('../models/author');

const generateAccessToken = (user_id) => {
    return jwt.sign(user_id, SECRET_TOKEN);
}

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.status(401).json({error: "Wrong auth"});

    jwt.verify(token, SECRET_TOKEN, async (err, user_id) => {
      //console.log(err);
      if (err) return res.sendStatus(403).json({error: "Access failed"});
      req.user = await Author.findOne({_id: user_id},{password: 0});
      if(!req.user.tickets) req.user.tickets = []; 
      
      next()
    });

  }

  module.exports = {generateAccessToken, authenticateToken};