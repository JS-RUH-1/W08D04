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

//   router.put("/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     fs.readFile("blog.json", "utf8", (err, data) => {
//       let arr = JSON.parse(data);

//       if (arr.findIndex((e) => e.id === id) === -1) res.json("id not found");
//       let index = arr.findIndex((e) => e.id === id);
//       arr[index] = {
//         id: id,
//         title: req.body.title || "post" + (arr.length + 1),
//         body: req.body.body,
//         date: req.body.date,
//       };

//       fs.writeFile("blog.json", JSON.stringify(arr), (err) => {
//         res.json(arr);
//       });
//     });
//   });

router.delete("/:name", (req, res) => {
  const authName = req.params.name;

  Author.deleteOne({ name: authName }, (err, res) => {
    console.log("Remove Author", res);
  });
  res.send(authName + " deleted");
});

module.exports = router;
