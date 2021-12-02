const express = require("express");
const mongoose = require('mongoose');
const BookSchema = require("../schema/BookSchema");

let router = express.Router();
const Book = mongoose.model('Book', BookSchema);


router.get("/", async (req, res) => {
  res.send(await Book.find({})); 
});

router.get("/:authorId", async(req, res) => {
  res.send(await Book.find({author_id: req.params.authorId})); 
});

router.delete("/:id", async (req, res) => {
  res.send( await Book.findByIdAndDelete(req.params.id))
});

router.patch("/:id", async (req, res) => {
  res.send(await Book.findByIdAndUpdate(req.params.id,{...req.body}))
});

router.post("/", async (req, res) => {
  res.send( await Book.create(req.body))
});

module.exports = router;
