const express = require("express");
const router = express.Router();
const Book = require('../models/schema').Book
const seedBook = require('../book_seed')
router.use(express.json())



// Book.insertMany(seedBook,(err)=>{
//   if(err){
//     console.log(err);
//   }
//   console.log('DoneAuther');
// })
// GET Books

router.get("/getBook", async (req, res) => {
  const books = await Book.find();

  res.json(books)

});

// POST

router.post("/postBook", async(req, res) => {
 
    const newBook = new Book ({
      title : req.body.title,
      pages: req.body.pages,
      price : req.body.price,
      bookImage:req.body.bookImage

    })
    try{
      // save new Book
      await newBook.save()
      const books = await Book.find()
      res.status(201).send(books)
    }catch(err){
      console.log(err);
    }

  console.log('Book Added');
});


// PUT and : for params

router.put("/editBook/:id",async (req, res) => {
  try{
  const book = await Book.findByIdAndUpdate(req.params.id,{
    title : req.body.title,
    pages: req.body.pages,
    price : req.body.price,
    bookImage:req.body.bookImage
  });
  await book.save()

  const books = await Book.find();

  res.send(books)
}catch(err){
  console.log(err);
}


});

// delete

router.delete("/deleteBook/:id",async (req, res) => {
 try{
   const book = await Book.findByIdAndDelete({_id:req.params.id})
   console.log(book);
   if(!book){
     return res.status(404).send()
   }
   const books = await Book.find()
   res.send(books)
 }catch(err){
   console.log(err);
 }
})

module.exports = router;
