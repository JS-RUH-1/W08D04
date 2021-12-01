// router to direction all requests 
const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router(),
AuthorController = require('../controllar/author')
const Author = require("../models/author");
const md5 = require('md5');

router.use(express.json());



//call functions from  AuthorController by use router obj.
router.put('/update/:authid', AuthorController.update)
router.delete('/delete/:authid', AuthorController.delete)

///////get all authors//////
router.get("/", (req, res) => {
  Author.find().then((data) => {
    res.json(data);
  });
});

//////////author id//////////
router.get("/:id", (req, res) => {
  Author.findById(req.params.id).then((data) => {
    res.json(data);
  });
});
///////////////////register/////////////////////
router.post("/register", async (req, res) => {
  const {name, nationality,image,email,password} = req.body;
  const passwordHash = md5(password);

  Author.insertMany([{ name: name,nationality:nationality, email: email,image:image, password: passwordHash }])
    .then(() => {
      res.send("The Author is a register");
    })
    .catch((err) => {
      console.log(err);
    });
});

//////////Login /////////////
router.post("/login", async (req, res) => {
  let author = await Author.findOne({email: req.body.email, password: md5(req.body.password)})
  console.log(author);
  if (author == null) res.send("Invalid Email or Password");
  if (author) {
    let authorjwt = jwt.sign(JSON.parse(JSON.stringify(author)), "THIS-IS-JUST-A-SECRET-HOMEWORK-MAHA");
    res.json(authorjwt);
  } else res.send("invalid email/password");
});

//exports to use this router in app
module.exports = router

