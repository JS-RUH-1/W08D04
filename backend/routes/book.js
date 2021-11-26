const router = require("express").Router()
const Book = require("../model/Book")


// // Post
router.post("/", async (req,res) => {
    try {
        const newBook = new Book({
            title: req.body.title,
            pages: req.body.pages,
            price: req.body.price,
            image: req.body.image
        });
        const book = await newBook.save();
        res.status(200).json(book);
    }
    catch(err){
        res.status(500).json(err);
    }
})


// // Update
router.put("/:id", async (req,res) => {
    const upDateUser = await Book.findByIdAndUpdate(req.params.id , { $set:req.body });
    res.status(200).json(upDateUser);
})


// // Delete
router.delete("/:id", async (req,res) => {
    const upDateUser = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json(upDateUser);
})


// // Get
router.get("/:id", async (req,res) => {
    const getBook = await Book.findById(req.params.id);
    res.status(200).json(getBook);
})

// Get all books
router.get("/", async (req,res) => {
    const allBooks = await Book.find()
    res.status(200).json(allBooks)
})

module.exports = router;