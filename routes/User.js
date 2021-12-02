const express = require("express");
const router = express.Router();
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");
const User = require("../models/user").User;

// Get specific User
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let u = await User.findOne({ username, password }).lean();

  if(u){
    let user = jwt.sign(u, "test secret");
    res.json(user);
  } 
  else{
    res.status(400).send("Cannot find user"); 
  }
});

// Get All Users
router.get("/accounts", async (req, res) => {
    User.find({}, (err, Users) => {
    Users.length
      ? res.status(201).json(Users)
      : res.status(400).send("No users");
  });
});

// ADD User
router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  User.find({ username, password }, (err, Users) => {
    Users.length
      ? res.send("User already exist")
      : User.create({ username, password }, (err, Users) => {
          if (err) {
            res.status(400).send("Error");
          }
          res.status(201).json(Users);
          console.log("added provided Users data", Users);
        });
  });
});

module.exports = router;
