const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const Book = require("../models/bookAndAuthor").Book;

// GET all Book
router.get("/", (req, res) => {
  Book.find({}, (err, Books) => {
    res.send(Books);
    console.log("All Books", Books);
  });
  console.log("GET from Book");
});

// ADD Book
router.post("/", (req, res) => {
  const book = {
    title: req.body.title,
    pages: req.body.pages,
    image: req.body.image,
  };
  Book.create(book, (err, Books) => {
    if (err) {
      console.log(err);
    }
    console.log("added provided Books data", Books);
    res.send("Book added");
    // mongoose.connection.close();
  });
});

router.put("/:title", (req, res) => {
  const title = req.params.title;

  Book.updateOne(
    { title: title },
    {
      title: req.body.title,
      pages: req.body.pages,
      image: req.body.image,
    },
    (err, Books) => {
      if (err) {
        console.log(err);
      }
      Books.modifiedCount == 0
        ? res.send("Book NOT found")
        : res.send("Book updated");
      // console.log("updated Book", Books);
      // res.send("Book updated");
      // mongoose.connection.close();
    }
  );
});

// DELETE Book
router.delete("/:title", (req, res) => {
  const authtitle = req.params.title;

  Book.deleteOne({ title: authtitle }, (err, Books) => {
    if (err) {
      console.log(err);
    }
    Books.deletedCount == 0
      ? res.send("Book not found")
      : res.send("Book deleted");
    // mongoose.connection.close();
  });
  // res.send(authtitle + " deleted");
});

module.exports = router;
