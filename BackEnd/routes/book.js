const router = require("express").Router(),

BookController = require("../controllers/book")


router.get("/",BookController.index)
//add new book 
// router.post("/create",BookController.create)
//update book
router.put("/book/:Aid/:Bid",BookController.update)
// delete book
router.delete("/book/:Aid/:Bid",BookController.delete)
//display book by id
///router.get("/:uid",BookController.show)


router.post('/book/:id',BookController.create)

module.exports = router


