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
        Book.findByIdAndUpdate(req.params.id, req.body).then(() => {
          res.send("UPDATED!!");
        });

      },
       //------------
     
      delete: (req,res)=>{
        Book.findByIdAndDelete(req.params.bookid).then(() => {
          Book.find().then((data) => res.send(data));
        });
      
      },
  ////////////////////////////////////////////////////////////////
    create:(req,res)=> {
      Book.insertMany([req.body]).then(() => {
        Book.find().then((data) => res.json(data));
      });
      
      
}
}