const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
router.use(express.json());
const UserSch = require("../models/user");
const mxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, '!@*#FASFJ(#!_$!4', { expiresIn: mxAge });
}

// const ifProduction=()=>{
// if (express().get('env') === 'production') {
//     express().set('trust proxy', 1) // trust first proxy
//     // sess.cookie.secure = true // serve secure cookies
//     return true
//   }
//   return false
// }

router.get("/SignUp", async (req, res) => {
  res.send(await UserSch.find({}));
});
router.get("/Login", async (req, res) => {
  res.send(await UserSch.findById(req.params.id));
});
router.post("/signup", async (req, res) => {
    
    const { email, password, name, nationality, image } = req.body;
    try {
      const author = await UserSch.create({
        email,
        password,
        name,
        nationality,
        image,
      });
      const token = createToken(author._id);
    //   res.cookie("jwt", token, { httpOnly: false, maxAge: mxAge * 1000 });
      res.status(200).json({ author_token: token });
    } catch (err) {
      res.status(400).json({ 'errors':"err" });
    }
  });
  
  router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const author = await authors.login(email, password);
      const token = createToken(author._id);
      res.cookie("jwt", token, { httpOnly: false, maxAge: mxAge * 1000 });
      res.status(200).json({ author: author._id });
    } catch (err) {
      res.status(400).json({ 'errors':'err' });
    }
  });
router.post("/Login", async (req, res) => {
  res.send(await UserSch.findById(req.params.id));
});
router.delete("/:id", async (req, res) => {
  await UserSch.deleteOne({ _id: req.params.id });
  res.send("DONE!");
});

router.post("/", async (req, res) => {
  await UserSch.create({
    name: req.body.name,
    age: req.body.age,
    nationality: req.body.nationality,
    image: req.body.image,
    gender: req.body.gender,
  });
  res.send("DONE!");
});

module.exports = router;
