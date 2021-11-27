const express = require("express");
const router = express.Router();
const {Book} = require('../models/schema')
const seedBook = require('../book_seed')
router.use(express.json())



// POST
router.post("/postAuther", async(req, res) => {
  Book.create(req.body,(err)=>{
    if(err){
      console.log(err);
    }
  })
 
  await res.json('Book Added')
});
// GET Books
router.get("/home", async (req, res) => {
  const Books = await Books.find()
  res.json(book);
});
// PUT and : for params

router.put("/editBook",async (req, res) => {
  Book.findOneAndUpdate({
    title:req.body.title,
    price:req.body.price,
    pages:req.body.pages,
    image:req.body.image
  },(err)=>{
    if(err){
      console.log(err);
    }
   
  })
  res.send('Edited')

});

// delete
router.delete("/deleteBook/",async (req, res) => {
  Book.deleteMany({title:req.body.title},(err)=>{
    if(err){
      console.log(err);
    }
  })
  await res.send('deleted book')
})

module.exports = router;
