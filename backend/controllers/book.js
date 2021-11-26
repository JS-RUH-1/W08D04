const Book = require('../Models/BookSchema')
module.exports={
    index:(req,res)=>{
        Book.find({})
        .then(books=>{
            res.json(books)
        })
        .catch(error=>{
            res.json({error:error})
        })
    },
    show:(req,res)=>{
        let bookId= req.params.bid
        Book.findById(bookId)
        .then(book =>{
            res.json({book})
        })
        .catch(error =>{
            res.json({error:error})
        })

    },
    update:(req,res)=>{
        let bookId =req.params.bid
        let bookInfo = {
            title : req.body.title,
            pages: req.body.pages,
            price:req.body.price,
            image:req.body.image
        }
        Book.findByIdAndUpdate(bookId,{$set:bookInfo})
        .then(book =>{
            res.send({message:"Book has been updated"})

        })
        .catch(error=>{
            res.send({error:error})
        })
    },
    delete:(req,res)=>{
        let bookId = req.params.bid
        Book.findByIdAndRemove(bookId)
        .then( ()=>{
            res.json({message:"book is deleted"})
        })
        .catch(error=>{
            res.json({error:error})
        })

    }
        
}
