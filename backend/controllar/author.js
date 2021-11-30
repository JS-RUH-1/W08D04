const passport = require("passport");
const Author = require("../models/author");
const Book = require("../models/book");
const jwt = require("jsonwebtoken");

module.exports = {
  // index function  to return all authors
  index: (req, res) => {
    //use Author model to return all authors info.
    Author.find({})
      //authors === response
      .then((authors) => {
        res.json(authors);
      })
      //if have an error
      .catch((error) => {
        res.json({ error: error });
      });
  },
  //-----------------------
  show: (req, res) => {
    let authorId = req.params.authid;
    Author.findById(authorId)
      .then((author) => {
        res.json({ author });
      })
      .catch((error) => {
        res.json({ error: error });
      });
  },
  //---------------------
  update: (req, res) => {
    let authorId = req.params.authid;

    let authorInfo = {
      name: req.body.name,
      age: req.body.age,
      nationality: req.body.nationality,
      image: req.body.image,
      gender: req.body.gender,
    };
    Author.findByIdAndUpdate(authorId, { $set: authorInfo })
      .then(() => {
        res.json({ message: "Author information has been updated" });
      })
      .catch((error) => {
        res.json({ error: error });
      });
  },
  //------------
  delete: (req, res) => {
    let authorId = req.params.authid;
    Author.findByIdAndRemove(authorId)
      .then(() => {
        res.json({ message: "Author is deleted" });
      })
      .catch((error) => {
        res.json({ error: error });
      });
  },

  // create:(req,res)=> {
  //   let newAuthor = new Author({
  //     name:req.body.name,
  //     age:req.body.age,
  //     nationality:req.body.nationality,
  //     image:req.body.image,
  //     gender:req.body.gender,
  //     books:[Book.schema]
  //   })
  //   newAuthor.save((error)=>{
  //     if(error)
  //     res.json({error:error})
  //     else
  //     res.json({message:"Author inserted"})
  //   })

  // }
  // --------------------------------
  // signup: (req, res) => {
  //   let newAuthor = new Author({
  //     name: req.body.name,
  //     age: req.body.age,
  //     nationality: req.body.nationality,
  //     image: req.body.image,
  //     email: req.body.email,
  //   });
  //   //2nd arrgument "password" =>   عشان ما يتخزن في الداتا بيس وينحسب له "سولد وهاش "
  //   Author.register(newAuthor, req.body.password, (error, author) => {
  //     if (author) {
  //       res.json({ message: "Author Signed Up" });
  //     } else {
  //       res.json({ error: error });
  //     }
  //   });
  // },
  //------------
  //create a token
  //for Login
  // authenticate: (req, res, next) => {
  //   //function authenticate have 2 parameter :
  //   //1st parameter => لتحديد انه العملية حتكون لوكال
  //   //2nd param.. => if have error
  //   //3rd param => keyword token يستخدمها لانشاء
  //   passport.authenticate("local", (error, author) => {
  //     console.log(" author ", author);
   
  //     if (author) {
  //       //signedToken => من خلالها نتأكد من هوية المستخدم
  //       let signedToken = jwt.sign(
  //         {
  //           //object => includes Token data
  //           data: author._id,
  //           exp: new Date().setDate(new Date().getDate() + 1), // set expair date for this token " ينتهي بعد يوم من هذا التاريخ +1"
  //         },
  //         "Lacorbi86"
  //       );
  //       res.json({
  //         success: true,
  //         //set a token
  //         token: signedToken,
  //       });
  //     } else {
  //       //author في حال حصل ايرور او مالقي
  //       res.json({
  //         success: false,
  //         message: "Could not authenticate author ",
  //       });
  //     }
  //   })(req, res, next);
  // },

  //-----------------------------
  // verifyJWT: (req,res, next)=> {
  //   //reqنعرف التوكن ناخذه من البودي لل
  //   let token = req.body.token
  //   // نتحقق هل تم ارسال توكن ام لا 
  //   if (token){
  //     //params تاخذ 3  jwt من  verify  اذا موجود نتحقق منه عن طريق فنكشن 
  //     //payload تمثل => authorid 
  //     jwt.verify(token,'Lacorbi86',(error,payload)=>{
  //       if(payload){
  //         //then حيرجعه في author اذا لقي 
  //         Author.findById(payload.data).then(author =>{
  //           if(author){
  //             //next اذا تحقق حينتقل للفنكشن اللي بعدها عن طريق
  //             next()  
  //           }
  //           else{
  //             res.json({ error: error });
  //             }
  //         })
  //       }
  //       else{
  //         res.json({message:"No author account found",error:true})
  //       }

  //     })
  //     next()
    
  //   }
    

  // }


};
