 const User = require('../models/user')
const passport =require('passport')
 module.exports ={


     //index is display all books
     index:(req,res)=>{
        User.find({})

        .then(user=>{
            res.json(user)
        })
        .catch(error =>{
            res.json({error:error})
        })
    },
/////////////////////////////
create:(req,res)=>{


    let newUser = new User({

         name:req.body.name,
          age:req.body.age,
        email:req.body.email
    })

    User.register(newUser, req.body.password,(error,user)=>{
      if(user)  {
          res.json({message :"User inserted successfully !"})
      }else{
          res.json({error :error})
          console.log(error);
      }
    })
     
},

authenticate:(req,res,next)=>{
    passport.authenticate('local',(error,user)=>{
        if(user){
            console.log(user._id);
             
            let signedToken = jsonWeb.sign({
 
            data: user._id,
            exp : new Date().setDate(new Date().getDate()+1)

            },'Lacorbi86');

            res.json({
                success:true,
                token:signedToken
            });
        }
          
        else{
            res.json({
                success:false,
                message:'Could not authenticate user'
            });
             
        }
    })(req,res,next);
}







 }