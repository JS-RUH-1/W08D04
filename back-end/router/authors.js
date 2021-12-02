const express = require("express");
const mongoose = require('mongoose');
const AuthorSchema = require("../schema/AuthorSchema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let router = express.Router();
const Author = mongoose.model('Author', AuthorSchema);

router.get("/", async (req, res) => {
  res.send((await Author.find({})));
});
router.get("/:id", async (req, res) => {
  res.send((await Author.findById(req.params.id)));
});

router.delete("/:id", async (req, res) => {
  res.send( await Author.findByIdAndDelete(req.params.id))
});

router.patch("/:id", async (req, res) => {
  res.send( await  Author.findByIdAndUpdate(req.params.id,{...req.body})) 
});

////////////////


router.post('/login', (req, res) => {
  Author.findOne({email: req.body.email}, (err, dbUser) => {
      if (!dbUser) {
          return res.status(404).json({message: "user not found"});
      } else {
          // password hash
          bcrypt.compare(req.body.password, dbUser.password, (err, compareRes) => {
              if (err) { // error while comparing
                  res.status(502).json({message: "error while checking user password"});
              } else if (compareRes) { // password match
                  const token = jwt.sign({ email: req.body.email }, 'secret', { expiresIn: '1h' });
                  res.status(200).json({message: "user logged in", "token": token, "id": dbUser._id, "name": dbUser.name});
              } else { // password doesnt match
                  res.status(401).json({message: "invalid credentials"});
              };
          });
      };
    }); 
}
);

router.post('/signup', (req, res) => {
  // checks if email already exists
  Author.findOne({email: req.body.email}, (err, dbUser)=>{
      if (dbUser) {
          return res.status(409).json({message: "email already exists"});
      } else if (req.body.email && req.body.password) {
          // password hash
          bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
              if (err) {
                  return res.status(500).json({message: "couldnt hash the password"}); 
              } else if (passwordHash) {
                  return Author.create(({...req.body,
                      password: passwordHash
                  }))
                  .then(() => {
                      res.status(200).json({message: "user created"});
                  })
                  .catch(err => {
                      console.log(err);
                      res.status(502).json({message: "error while creating the user"});
                  });
              };
          });
      } else if (!req.body.password) {
          return res.status(400).json({message: "password not provided"});
      } else if (!req.body.email) {
          return res.status(400).json({message: "email not provided"});
      };
  })
});

module.exports = router;
