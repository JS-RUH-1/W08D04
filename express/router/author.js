const express = require("express");
const router = express.Router();
const seedAuther = require("../author_seed");
router.use(express.json());
const Book = require("../models/schema").Book;

// Add Auther of the end becuse i have 2 schema on one file
const Auther = require("../models/schema").Author;

router.get("/getAuther", async (req, res) => {
  const authers = await Auther.find();
  // res.status(200).json(authers)
  res.json(authers);
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
  const newAuther = new Auther({
    name: req.body.name,
    age: req.body.age,
    nationality: req.body.nationality,
    autherImage: req.body.autherImage,
    gender: req.body.gender,
  });
  // const newBook = new Book({
  //   title:req.body.title,
  //   pages:req.body.pages,
  //   price:req.body.price,
  //   bookImage:req.body.bookImage
  // })

  // newAuther.books.push(newBook)
  try {
    await newAuther.save();
    const authers = await Auther.find();
    res.status(201).send(authers);
  } catch (err) {
    console.log(err);
  }
  console.log("added");
});

// // PUT and : for params

router.put("/editAuther/:id", async (req, res) => {
 try{
 
 
  const auther = await Auther.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      age: req.body.age,
      nationality: req.body.nationality,
      gender: req.body.gender,
      autherImage: req.body.autherImage
      
    } )
    
    await auther.save()

    const authers = await Auther.find();
    
    res.send(authers)
  
  }catch(e){console.log(e);}

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
  try{
  const auther = await  Auther.findByIdAndDelete({ _id:req.params.id })
  console.log(auther);

  if (!auther){
    return res.status(404).send()
  }
  const authers = await Auther.find()
   res.send(authers);

  }
  catch(e){
    console.log('Error');
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
