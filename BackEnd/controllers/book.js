const req = require("express/lib/request");

const Book = require("../models/book");
const Author = require("../models/author");

module.exports={

    //index is display all books
    index:(req,res)=>{
        Book.find({})

        .then(books=>{
            res.json(books)
        })
        .catch(error =>{
            res.json({error:error})
        })
    },
////////////////////////////////////////////////////////////////
     
     ////////////////////////////////////////////////////////////////
    //Show book by givein id
    // show:(req,res)=>{
    //     let _id = req.params.uid
    //     Book.findById(_id)
    //     .then(book=>{
    //         res.json({book})
    //     })
    //     .catch(error =>{
    //     res.json({error:error})
    //     })
    // },
    /////////////
     /////////////
    //create new book

    create: async (req,res)=>{
    const _id = req.params.id;
    const author = await Author.findOne({_id})
        let newBook = new Book({

            title:req.body.title,
            pages:req.body.pages,
            price:req.body.price,
            image:req.body.image

})
    console.log(author)
    author.books.push(newBook);
     
            try{
            await author.save()
            res.status(201).send(author) 
            }
               catch(e){
                   console.error(e)
               }  
    },
    /////////////////////////////
     //update a book 
     update:async(req,res)=>{

        const Bid =req.params.Bid;
        const author = await Author.findById(req.params.Aid)
        
        let editBook = new Book({

            title:req.body.title,
            pages:req.body.pages,
            price:req.body.price,
            image:req.body.image

            })

            if(!author){
                return res.status(404).send()
            }

            console.log(author)
            await author.books.pull({_id: Bid});
             await author.books.push(editBook);
             await author.save()
            res.status(200).send(author)

            console.log(author)
            
     },

    //delete a book
    delete:async (req, res)=>{

    const Bid =req.params.Bid;

    const author = await Author.findById(req.params.Aid)
       
    if(!author){
    return res.status(404).send()
    }

            await author.books.pull({_id: Bid});
            await author.save()
            res.status(200).send(author)





    console.log(author)

    },


    ////////////////////
    // delete:(req,res)=>{

    //     let _id=req.params.uid
    //     Book.findByIdAndRemove(_id)
    //     .then(() =>{
    //         res.json({message:"Book is deleted"})
    //     })
    //     .catch(error =>{
    //         res.json({error:error})
    //     })
    // }

}