
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
router.use(express.json())
const AuthorSch = require("../models/bookAndAuthor").Author;
const mxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, '*ad(*^%udkfh73ryg73&*^^bnj2356mkf8dg23fsg4>dsf<LP', { expiresIn: mxAge });
}

const checkAuth = (req, res, next) => {
    const token = req.localStorage;
    if (token) {
      jwt.verify(token, '*ad(*^%udkfh73ryg73&*^^bnj2356mkf8dg23fsg4>dsf<LP', (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.rend('false');
        } else {
          console.log(decodedToken);
          res.send('true')
        }
      });
    } else {
      res.send('false');
    }
  };

const handleErrors = (err) => {
    console.log("Error code:",err.code)
    let error = []
    if (err.code === 11000) {
        error[1] = 'that email is already registered';
        return error;
      }
    if(err.message.includes('Author validation failed')){

        Object.values(err.errors).forEach(e=>error.push({message: e.properties.message,
        type:e.properties.type,
        path:e.properties.path,
        value:e.properties.value}))
        console.log(error)
    }

    return error;
}

router.get("/", async (req, res) => {
res.send(await AuthorSch.find({}).then((data)=>data).catch((err)=>"authors are unavailable"))
});
router.get("/:id", async (req, res) => {
    res.send(await AuthorSch.findById(req.params.id).then((data)=>data).catch((err)=>"incorrect author ID"))
});
router.delete("/:id", async (req, res) => {
    await AuthorSch.deleteOne({_id:req.params.id}).then(()=>{
        res.send("DONE!")
    }).catch((err)=>{res.send("This author already deleted")})
});
router.put("/:id", async (req, res) => {
    await AuthorSch.findOneAndUpdate({_id:req.params.id},
        { $set: {age:req.body.age} }).then(()=>res.send("DONE!")).catch((err)=>console.log("Cannot update this author"))
});


router.post("/", async (req, res) => {
    let errorMsg = [];
    req.body.name==undefined||req.body.name==""?errorMsg.push("author_name"):""
    req.body.nationality==undefined||req.body.nationality==""?errorMsg.push("nationality"):""
    req.body.image==undefined||req.body.image==""?errorMsg.push("image"):""
    if(errorMsg.length>0){
        res.send(["error",...errorMsg]);
        return;
    }
    await AuthorSch.create({name:req.body.name, age:req.body.age, nationality:req.body.nationality, image:req.body.image, gender:req.body.gender })
    res.send("DONE!")
});

router.post("/login", async (req, res) => {
      const { email, password} = req.body;
      try{
          const author = await AuthorSch.login(email,password);
          const token = createToken(author._id)
          res.status(200).json({ author_token: token });
          console.log('authorIS',author)
      }
      catch(err){
        console.log('failed where email',email,' and password',password)
          res.status(400).json({})
        }
})
router.post("/signup", async (req, res) => {
    let operation = { name:"", email:"", password:"", nationality:"", image:"", age:"", gender:"", books:""}
    req.body.name!=undefined ? operation.name=req.body.name : ""
    req.body.email!=undefined ? operation.email=req.body.email : ""
    req.body.password!=undefined ? operation.password=req.body.password : ""
    req.body.nationality!=undefined ? operation.nationality=req.body.nationality : ""
    req.body.image!=undefined ? operation.image=req.body.image : ""
    req.body.age!=undefined ? operation.age=req.body.age : ""
    req.body.gender!=undefined ? operation.gender=req.body.gender : ""
    console.log("operation:",operation)
    console.log("req.body:",req.body)
    // res.send(await AuthorSch.create({
    //     name:operation.name,
    //     email:operation.email,
    //     password:operation.password,
    //     nationality:operation.nationality,
    //     image:operation.image,
    //     age:operation.age,
    //     gender:operation.gender})
    //     .then((data)=>createToken(data._id))
    //     .catch((err)=>handleErrors(err))
    // );
    try {
      const author = await AuthorSch.create({
          name:operation.name,
          email:operation.email,
          password:operation.password,
          nationality:operation.nationality,
          image:operation.image,
          age:operation.age,
          gender:operation.gender});
      const token = createToken(author._id);
      res.cookie("jSon wEb toKeN", token, { httpOnly: true, maxAge: mxAge * 1000 });
      res.status(201).json({ author_token: token });
    } catch (err) {
        const errors = handleErrors(err)
      res.status(400).json({errors});
    }
  });

  

module.exports = router;