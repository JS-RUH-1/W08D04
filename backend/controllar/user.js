const User = require('../models/user')


module.exports = {


    signup: (req,res)=>{
        let newUser = new User({
            name: req.body.name,
            email: req.body.email
        })
        
        //2nd arrgument "password" =>   عشان ما يتخزن في الداتا بيس وينحسب له "سولد وهاش " 
        User.register(newUser,req.body.password,(error,user)=>{
            if(user){
                res.json({message:"User Signed Up",})
            }else{
                res.json({error: error})
            }
        })

    }
}