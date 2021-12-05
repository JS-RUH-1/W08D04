const express = require("express");
const router = express.Router();
const seedAuther = require("../author_seed");
router.use(express.json());
const Book = require("../models/schema").Book;
const JWT = require("jsonwebtoken")
// Add Auther of the end becuse i have 2 schema on one file
const Auther = require("../models/schema").Author;
const bcrypt = require("bcrypt");


router.get("/getAuther", async (req, res) => {
  const authers = await Auther.find();
  // res.status(200).json(authers)
  res.json(authers);
});

router.get(`/getAuther/:id`, async (req, res) => {
  const auther = await Auther.findById(req.params.id);

  res.json(auther);
});

// Auther.insertMany(seedAuther,(err)=>{
//   if(err){
//     console.log(err);
//   }
//   console.log('DoneAuther');
// })
// // POST
// router.post("/postAuther", async(req, res) => {
//   Auther.create(req.body , async(err,res)=>{
//     if(err){
//       console.log(err);
//     }

//   })
//  await res.json('json Done')
// })

router.post("/postAuther", async (req, res) => {
  
  // هنا علشان يشفر 
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(req.body.password, salt)
  //تنتهي هنا 

  const newAuther = new Auther({
    name: req.body.name,
    age: req.body.age,
    nationality: req.body.nationality,
    autherImage: req.body.autherImage,
    gender: req.body.gender,
    email:req.body.email,
    password:passwordHash
  });

  // const newBook = new Book({
  //   title:req.body.title,
  //   pages:req.body.pages,
  //   price:req.body.price,
  //   bookImage:req.body.bookImage
  // })

  // newAuther.books.push(newBook)

  try {

   const atherJson =  await newAuther.save();
   const token = JWT.sign({name:atherJson.name,email:atherJson.email},"SHHHHH");

    // const authers = await Auther.find();
    res.status(201).json(token);
  } catch (err) {
    console.log(err);
  }
  console.log("added");
});

// // PUT and : for params

router.put("/editAuther/:id", async (req, res) => {
  try {
    const auther = await Auther.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      age: req.body.age,
      nationality: req.body.nationality,
      gender: req.body.gender,
      autherImage: req.body.autherImage,
    });

    await auther.save();

    const authers = await Auther.find();

    res.send(authers);
  } catch (e) {
    console.log(e);
  }

  //   Auther.findOneAndUpdate({
  //     name:req.body.name,
  //     age:req.body.age,
  //     nationality:req.body.nationality,
  //     gender:req.body.gender,
  //     image:req.body.image
  //    }, (err) => {
  //      if(err){
  //        console.log(err);
  //      }
});

// // delete
router.delete("/deleteAuther/:id", async (req, res) => {
  try {
    const auther = await Auther.findByIdAndDelete({ _id: req.params.id });
    console.log(auther);

    if (!auther) {
      return res.status(404).send();
    }
    const authers = await Auther.find();
    res.send(authers);
  } catch (e) {
    console.log("Error");
  }
});

// importat

// -D
// app.use(express.urlencoded({extended:flase}))

// middele ware => access to req and res
// MVC =>Modul ,view ,control
// control => function
// view => html

module.exports = router;
