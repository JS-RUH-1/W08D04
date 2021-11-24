const express = require("express");
const mongoose = require('mongoose');
const BookSchema = require("../BookSchema");


let router = express.Router();
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}
const Book = mongoose.model('Book', BookSchema);



router.get("/", (req, res) => {
  Book.find({}, (err, books) => {
    res.send(books)
  }); 
});

router.post("/", (req, res) => {
  Book.create(req.body, function (err, res) {
    if (err) return handleError(err);
  });
  res.send('saved!')
});

router.delete("/", (req, res) => {
  Book.deleteMany({ title: req.body.title}, () => {
  console.log('deleted')
}); 
  res.send('deleted!')
});

router.put("/", (req, res) => {
  Book.findOneAndUpdate({ title: req.body.title },
  { 
    price: req.body.price, 
    pages: req.body.pages,
    image: req.body.image

  }, () => {
      console.log('updated')
  }); 


  res.send('updated!')
});



module.exports = router;
