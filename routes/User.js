const express = require("express");
const router = express.Router();
let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

// const mongoose = require("mongoose");

const User = require("../models/user").User;

// Get specific User
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let u = await User.findOne({ username, password }).lean();
  if(u){
    let user = jwt.sign(u, "test secret");
    // console.log(user)
    res.json(user);
  } 
  else{
    res.status(400).send("Cannot find user"); 
  }
//   let user = jwt.sign(u, "test secret");
//   console.log(user)

//   console.log(username, password);
//   // console.log(req.body.username)
//   // console.log(req.body.password)
//   User.find({ username, password }, (err, Users) => {
//     // console.log(Users.length)
//     Users.length
//       ? res.status(201).json(Users)
//       : res.status(400).send("Cannot find user");
//     //   res.send(Users);
//     //   console.log("All Users", Users.length);
//   });
});

// ADD User
router.post("/signup", (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };
  const { username, password } = req.body;
  User.find({ username, password }, (err, Users) => {
    // //   res.send(Users);
    // res.status(201).json(Users)
    //   console.log("All Users", Users);
    Users.length
      ? res.send("User already exist")
      : User.create(user, (err, Users) => {
          if (err) {
            console.log(err);
          }
          res.status(201).json(Users);
          console.log("added provided Users data", Users);
          // res.send("User added");

          // mongoose.connection.close();
        });
  });
});

module.exports = router;
