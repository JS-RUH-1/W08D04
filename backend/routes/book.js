const express = require("express");
const router = express.Router();
router.use(express.json());

const Book = require("../models/bookAndAuthor").Book;

router.get("/", async (req, res) => {
  res.send(await Book.find({}));
});
router.get("/:id", async (req, res) => {
  res.send(await Book.findById(req.params.id));
});
router.delete("/:id", async (req, res) => {
  await Book.deleteOne({ _id: req.params.id });
  res.send("DONE!");
});
router.put("/:id", async (req, res) => {
  let operation = {
    title: "EMPTY",
    pages: "EMPTY",
    price: "EMPTY",
    image: "EMPTY"
  }; //, books:"EMPTY"}
  req.body.title != undefined ? (operation.title = req.body.title) : delete operation.title;
  req.body.pages != undefined ? (operation.pages = req.body.pages) : delete operation.pages;
  req.body.price != undefined ? (operation.price = req.body.price) : delete operation.price;
  req.body.image != undefined ? (operation.image = req.body.image) : delete operation.image;
  //req.body.books!=undefined? operation.books=req.body.books:delete operation.books
  await Book.updateOne({ _id: req.params.id }, { $set: operation });
  res.send("DONE!");
});

router.post("/", async (req, res) => {
  await Book.create({
    title: req.body.title,
    pages: req.body.pages,
    price: req.body.price,
    image: req.body.image
  });
  res.send("DONE!");
});

module.exports = router;
