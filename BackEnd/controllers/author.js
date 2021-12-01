const req = require("express/lib/request");

const passport =require('passport')
const jsonWebToken =require('jsonwebtoken')
const Author = require("../models/author")

module.exports = {

//method index is bring all data 

//SignUp and Login for author
    index:(req,res)=>{
        Author.find({})
        .then(authors=>{
            res.json(authors)
        })
        .catch(error=>{
            res.json({error:error})
        })
    },
    ////create new authors
    create:(req,res)=>{

        let newAuthor = new Author({
            name:req.body.name, 
             age:req.body.age,
           email:req.body.email,
     nationality:req.body.nationality,
          image:req.body.image,
         gender:req.body.gender,

        
})

Author.register(newAuthor, req.body.password,(error,user)=>{
    if(user)  {
        res.json({message :"User inserted successfully !"})
    }else{
        res.json({error :"Email is taken"})
        console.log(error);
    }
  })

    },

    ////////////////////////////////////////////////////////////////
    
    authenticate:(req,res,next)=>{
        passport.authenticate('local',(error,user)=>{
           
            if(user){
                 
                 
                let signedToken = jsonWebToken.sign({
                data: user._id,
                exp : new Date().setDate(new Date().getDate() +1)
    
                },'Locorbi86');
    
                res.json({
                     
                    success:true,
                    token:signedToken
                });
    
                console.log(user);
             }
           else{
                res.json({
                    success:false,
                    message:'Could not authenticate user'
                });
                 
            }
        })(req,res,next);
    },
       
    ////////////////////////////////////////////////////////////////
    
////////////////////////////////////////////////////////////////////////////////////////////////

 
//Show book by givin id 

show:(req,res)=>{
    let _id=req.params.uid

    Author.findById(_id)
    .then(author=>{
        res.json({author})
    })
    .catch(error =>{
    res.json({error:error})
    })
},
//////////////////////////

// update:(req,res)=>{
//     let _id = req.params.uid
//     let authorInfo ={
//         name:req.body.name,
//          age:req.body.age,
//  nationality:req.body.nationality,
//        image:req.body.image,
//       gender:req.body.gender,
//       books:req.body.books

//     }

//     Author.findByIdAndUpdate(_id,{$set:authorInfo})
//     .then(author =>{
//     res.json({message:"Author Information is updated"})
//     })
//     .catch(error =>{
//     res.json({error:error})
//     })
//     },

////////////////////////////////////////////////////////////////
 //delete a book


 

//  delete:(req,res)=>{
//     let _id=req.params.uid
//     Author.findByIdAndRemove(_id)
//     .then(() =>{
//         res.json({message:"Author is deleted"})
//     })
//     .catch(error =>{
//         res.json({error:error})
//     })
// }
}
