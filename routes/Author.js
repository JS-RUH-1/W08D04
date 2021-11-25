const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Author = require("../models/bookAndAuthor").Author;

// GET all author
router.get("/", (req, res) => {
  Author.find({}, (err, authors) => {
    res.send(authors);
    console.log("All Authors", authors);
  });
  console.log("GET from author");
});
// GET details of specific author
router.get("/:name", (req, res) => {
  Author.find({name : req.params.name}, (err, authors) => {
    res.send(authors);
    console.log("All Authors", authors);
  });
  console.log("GET from author");
});

// ADD Author
router.post("/", (req, res) => {
  const author = {
    name: req.body.name,
    nationality: req.body.nationality,
    image: req.body.image,
  };
  Author.create(author, (err, authors) => {
    if (err) {
      console.log(err);
    }
    console.log("added provided authors data", authors);
    res.send("Author added");
    // mongoose.connection.close();
  });
});

router.put("/:name", (req, res) => {
  const name = req.params.name;

  Author.updateOne(
    { name: name },
    {
      name: req.body.name,
      nationality: req.body.nationality,
      image: req.body.image,
    },
    (err, authors) => {
      if (err) {
        console.log(err);
      }
      console.log("updated author", authors);
      res.send("Author updated");
      // mongoose.connection.close();
    }
  );
});

// DELETE Author
router.delete("/:name", (req, res) => {
  const authName = req.params.name;

  Author.deleteOne({ name: authName }, (err, authors) => {
    if (err) {
      console.log(err);
    }
    authors.deletedCount == 0 ?  res.send("Author not found") : res.send(authors)
    // mongoose.connection.close();
  });
  // res.send(authName + " deleted");
});

module.exports = router;
