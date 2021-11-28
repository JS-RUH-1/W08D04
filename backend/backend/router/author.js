const router = require("express").Router();
const mongoose = require("mongoose");
const AuthorSchema = require("../schema/author");
const Author = mongoose.model("Author",AuthorSchema);
// const Book = mongoose.model('Book', BookSchema);
const seedAuthor = require("../seed.js/author_seed");

router.get("/", (req, res) => {
    Author.find({}, (err, authors) => {
      res.send(authors)
    }); 
      
//       =========>dont opint a gine <=============
      // Author.insertMany(seedAuthor, (err, authors) => {
      //   if (err){ console.log(err)}
      //     console.log("added provided authors data", authors)
      //    });
      
  });

  router.post("/", (req, res) => {
    Author.create(req.body, function (err, res) {
      if (err) return (err);
    });
    res.send('done')
  });

  router.put("/", (req, res) => {
    Author.findOneAndUpdate({ name: req.body.name },
    { 
      age: req.body.age,
      nationality: req.body.nationality, 
      gender: req.body.gender,
      image: req.body.image
  
    }, () => {
        console.log('done')
    }); 
    res.send('done')
  });

  router.delete("/", (req, res) => {
    Author.deleteMany({ name: req.body.name}, () => {
    console.log('delet')
  }); 
    res.send('delet')
  });

module.exports = router;