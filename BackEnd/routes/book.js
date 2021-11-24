const router = require("express").Router(),

BookController = require("../controllers/book")


router.get("/",BookController.index)
//add new book 
router.post("/create",BookController.create)
//update book
router.put("/:uid/update",BookController.update)
// delete book
router.delete("/:uid/delete",BookController.delete)
//display book by id
router.get("/:uid",BookController.show)
module.exports = router