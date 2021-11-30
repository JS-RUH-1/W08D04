const Book = require('../models/book')

module.exports = {
  // index function to return all books 
    index:(req,res)=>{
 //use Book model to return all books info.
         Book.find({})
         //books === response
         .then(books => {
             res.json(books)
         })
         //if have an error
         .catch(error =>{
             res.json({error: error})
         })
    },
    //---------------------
    show:(req,res)=>{
        let bookId = req.params.bookid
        Book.findById(bookId)
        .then(book =>{
          res.json({book})
        })
        .catch(error =>{
          res.json({error: error})
          })
      },
       //---------------------
      update:(req,res)=>{
        let bookId = req.params.bookid
  
        let bookInfo = {
            title:req.body.title,
            pages:req.body.pages,
            price:req.body.price,
            image:req.body.image
        }
         Book.findByIdAndUpdate(bookId,{$set:bookInfo})
         .then(() => {
          res.json({message: "Book information has been updated"})
         })
         .catch(error =>{
          res.json({error: error})
          })
      },
       //------------
      delete: (req,res)=>{
        let bookId = req.params.bookid
        Book.findByIdAndRemove(bookId)
        .then(()=>{
          res.json({message:"Book is deleted"})
        })
        .catch(error =>{
          res.json({error: error})
          })
      },
  ////////////////////////////////////////////////////////////////
    create:(req,res)=> {
      let newBook = new Book({
        title:req.body.title,
        pages:req.body.pages,
        price:req.body.price,
        image:req.body.image
      
      })
      newBook.save((error)=>{
        if(error)
        res.json({error:error}) 
        else
        res.json({message:"Book inserted"})
      })
      // Book.insertMany([req.body]);
      ;
}
}