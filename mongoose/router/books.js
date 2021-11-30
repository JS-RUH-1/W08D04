const express = require("express");
const mongoose = require('mongoose');
const BookSchema = require("../BookSchema");


let router = express.Router();
const Book = mongoose.model('Book', BookSchema);

router.get("/", (req, res) => {
  Book.find({}, (err, book) => {
    res.send(book)
  }); 
});

router.get("/:authorId", (req, res) => {
  Book.find({author_id: req.params.authorId}, (err, book) => {
    res.send(book)
  }); 
});

router.post("/", (req, res) => {
  Book.create(req.body, function (err, res) {
    if (err) return handleError(err);
  });
  res.send('saved!')
});

router.delete("/:id", (req, res) => {
  Book.deleteOne({ _id: req.params.id}, () => {
  console.log('deleted')
}); 
  res.send('deleted!')
});

router.patch("/:id", (req, res) => {
  Book.findOneAndUpdate({ _id: req.params.id },
  { 
    price: req.body.price, 
    title: req.body.title, 
    pages: req.body.pages,
    image: req.body.image

  }, () => {
      console.log('updated')
  }); 


  res.send('updated!')
});



module.exports = router;
