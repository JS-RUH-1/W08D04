const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const User = require("../models/user").User;

// Get specific User
router.get("/", (req, res) => {
  User.find(
    { username: req.body.username, password: req.body.password },
    (err, Users) => {
        Users.length ? res.send(Users) : res.send("User not found");
    //   res.send(Users);
    //   console.log("All Users", Users.length);
    }
  );
});

// ADD User
router.post("/", (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
  };

  User.create(user, (err, Users) => {
    if (err) {
      console.log(err);
    }
    console.log("added provided Users data", Users);
    // res.send("User added");
    User.find({}, (err, Users) => {
      res.send(Users);
      console.log("All Users", Users);
    });
    // mongoose.connection.close();
  });
});

module.exports = router;
