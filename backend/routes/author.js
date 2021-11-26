const router = require("express").Router()
const Auther = require("../model/Author")


// Post
router.post("/", async (req,res) => {
    try {
        const newAuther = new Auther({
            name: req.body.name,
            age: req.body.age,
            nationality: req.body.nationality,
            image: req.body.image,
            gender: req.body.gender,
            books: req.body.books
        });
        const auther = await newAuther.save();
        res.status(200).json(auther);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// Update
router.put("/:id", async (req,res) => {
    const upAuther = await Auther.findByIdAndUpdate(req.params.id , { $set:req.body });
    res.status(200).json(upAuther);
})


// // Delete
router.delete("/:id", async (req,res) => {
    const upAuther = await Auther.findByIdAndDelete(req.params.id);
    res.status(200).json("Deleted sucsessfuly...")
})


// // Get
router.get("/:id", async (req,res) => {
    const upAuther = await Auther.findById(req.params.id);
    res.status(200).json(upAuther);
})


// Get All Authers
router.get("/", async (req,res) => {
    const allAuthers = await Auther.find()
    res.status(200).json(allAuthers)
})

module.exports = router;