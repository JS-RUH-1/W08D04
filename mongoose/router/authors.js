const express = require("express");
const mongoose = require('mongoose');
const AuthorSchema = require("../AuthorSchema");


let router = express.Router();
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/test');
}
const Author = mongoose.model('Author', AuthorSchema);

router.get("/", (req, res) => {
  Author.find({}, (err, authors) => {
    res.send(authors)
  }); 
});

router.post("/", (req, res) => {
  Author.create(req.body, function (err, res) {
    if (err) return handleError(err);
  });
  res.send('saved!')
});

router.delete("/", (req, res) => {
  Author.deleteMany({ name: req.body.name}, () => {
  console.log('deleted')
}); 
  res.send('deleted!')
});

router.put("/", (req, res) => {
  Author.findOneAndUpdate({ name: req.body.name },
  { 
    age: req.body.age,
    nationality: req.body.nationality, 
    gender: req.body.gender,
    image: req.body.image

  }, () => {
      console.log('updated')
  }); 


  res.send('updated!')
});



module.exports = router;
