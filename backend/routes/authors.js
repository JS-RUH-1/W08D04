const express = require('express')
const Author = require('../models/author')
const router = express.Router()
const { generateAccessToken, authenticateToken } = require('../base/jwt');
const md5 = require('md5');

// get all Authors
router.get('/', async (req, res) => {
  res.json((await Author.find({},{password: 0})));
});

// get (me) Author
router.get('/me', authenticateToken, async (req, res) => {
  res.json(req.user);
});

// get one Author
router.get('/:id', async (req, res) => {
  res.json((await Author.findOne({_id: req.params.id},{password: 0})));
});



// exchange username & password with token
router.post('/login', async (req, res) => {

  if(!req.body.email || !req.body.password) 
    return res.status(400).json({message:"Missing parameters"});

  let user = await Author.findOne({email: req.body.email, password: md5(req.body.password)})
  if(user) {
    const generatedToken = await generateAccessToken(`${user._id}`);
    return res.json({token: generatedToken});
  }
  return res.status(403).json({message: "Wrong Email or Password"});
});

// exchange register with token
router.post('/register', async function (req, res) {
  console.log(req.body)

      try {
        const u = await Author.create({
          ...req.body,
          password: md5(req.body.password)
        })
        const generatedToken = await generateAccessToken(`${u._id}`)
        return res.json({token: generatedToken});
      } catch (err) {
        console.log("ERROR",err)
        return res.status(403).json({message: err.toString()})
      }

})

module.exports = router