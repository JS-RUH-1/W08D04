const express = require("express");
const router = express.Router();
router.use(express.json());

const BookSch = require("../models/bookAndAuthor").Book;
router.get("/", async (req, res) => {
  res.send(await BookSch.find({}).then((data)=>data).catch((err)=>"books are unavailable"));
});
router.get("/:id", async (req, res) => {
  res.send(await BookSch.findById(req.params.id).then((data)=>data).catch((err)=>"incorrect book ID"));
});
router.delete("/:id", async (req, res) => {
  await BookSch.deleteOne({ _id: req.params.id }).then(()=>{
    res.send("DONE!");
  }).catch((err)=>{res.send("This book already deleted")})
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
  await BookSch.updateOne({ _id: req.params.id }, { $set: operation })
  .then(()=>res.send("DONE!")).catch((err)=>console.log("Cannot update this book"))
});

router.post("/", async (req, res) => {
  let errorMsg = [];
  req.body.title==undefined||req.body.title==""?errorMsg.push("book_title"):""
  req.body.pages==undefined||req.body.pages==""?errorMsg.push("pages"):""
  req.body.image==undefined||req.body.image==""?errorMsg.push("image"):""
  if(errorMsg.length>0){
    res.send(["error",...errorMsg]);
    return;
}
  await BookSch.create({
    title: req.body.title,
    pages: req.body.pages,
    price: req.body.price,
    image: req.body.image
  });
  res.send("DONE!");
});

module.exports = router;
