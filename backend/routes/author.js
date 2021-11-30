// router to direction all requests 
const express = require('express')
const router = express.Router(),
AuthorController = require('../controllar/author')
const Author = require("../models/author");
const md5 = require('md5');
const { generateAccessToken, authenticateToken } = require('../jwt');

router.use(express.json());



//call functions from  AuthorController by use router obj.
router.put('/:authid/update', AuthorController.update)
router.delete('/:authid/delete', AuthorController.delete)


//--------------------------------
// get all authors
router.get('/', authenticateToken, async (req, res) => {
res.json((await Author,find({},{password : 0})))
});
//--------------------------------
// get one author
router.get('/:authid', async (req, res) => {
    res.json((await Author,findOne({_id:req.params.authid},{password : 0})))
    });

  //--------------------------------
  // exchange username & password with token //login
router.post('/login', async (req, res) => {

    if(!req.body.email || !req.body.password) 
    return res.status(400).json({error:"Missing parameters"});

    let author = await Author.findOne({email: req.body.email, password: md5(req.body.password)})
    if(author) {
    const generatedToken = await generateAccessToken(`${author._id}`);
    return res.json({token: generatedToken});
    }
    return res.status(403).json({error: "Wrong Email or Password"});
})
  //--------------------------------
  // Signup
router.post('/register', async function (req, res) {

        try {
        const Newauthor = await Author.create({
            name: req.body.name,
            nationality:req.body.nationality,
            image:req.body.image,
            email: req.body.email,
            password: md5(req.body.password)

        })
    
        const generatedToken = await generateAccessToken(`${Newauthor._id}`)
        return res.json({token: generatedToken});
        } catch (err) {
            console.log("error",err)
        return res.status(403).json({message: err.toString()});
        }

});



//exports to use this router in app
module.exports = router

