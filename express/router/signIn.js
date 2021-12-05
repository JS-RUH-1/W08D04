const express = require('express');
const router = express.Router();
const Admin = require('../models/schema').Admin;

router.use(express.json())

// All Admins
router.get('/getAdmin',async(req,res)=>{
    const admins = await Admin.find()
    res.json(admins)
});
// one spesefic Admin
router.get('getAdmin/:id',async(req,res)=>{
    const admin = await Admin.findById(req.params.id)
    res.json(admin);
})
// post
router.post('postAdmin',async(req,res)=>{
    
    const newAdmin = new Admin({
        email:req.body.email,
        password:req.body.password
    })
    try{
        await newAdmin.save();
        const admins = await Admin.find()
        res.status(201).send(admins)
    }catch(err){
        console.log(err);
    }
})
