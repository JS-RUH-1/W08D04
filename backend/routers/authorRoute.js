const express = require("express");
const router = express.Router();
let authors = require("../models/author");
router.get("/", (req, res) => {
  authors
    .find()
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/authorbyid/:id", (req, res) => {
  authors
    .findById(req.params.id)
    .then((data) => {
      res.json(data);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/addauthor", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const nationality = req.body.nationality;
  const image = req.body.image;
  const gender = req.body.gender;
  const books = req.body.books;

  const newAuthor = new authors({
    name,
    age,
    nationality,
    image,
    gender,
    books,
  });
  newAuthor
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/updateauthor/:id", (req, res) => {
  authors.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
    if (err) console.log(err);
    res.json("Author updated!");
  });
});

router.delete("/deleteauthor/:id", (req, res) => {
  authors
    .findByIdAndDelete(req.params.id)
    .then(() => {
      authors
        .find()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
