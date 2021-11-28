
const express = require("express");
const router = express.Router();
router.use(express.json())

const Author = require("../models/bookAndAuthor").Author;

router.get("/", async (req, res) => {
res.send(await Author.find({}))
});
router.get("/:id", async (req, res) => {
    res.send(await Author.findById(req.params.id))
});
router.delete("/:id", async (req, res) => {
    await Author.deleteOne({_id:req.params.id})
    res.send("DONE!")
});
router.put("/:id", async (req, res) => {
    let operation = { name:"EMPTY", age:"EMPTY", nationality:"EMPTY", gender:"EMPTY", image:"EMPTY"}//, books:"EMPTY"}
    req.body.name!=undefined ? operation.name=req.body.name : delete operation.name
    req.body.age!=undefined ? operation.age=req.body.age : delete operation.age
    req.body.nationality!=undefined ? operation.nationality=req.body.nationality : delete operation.nationality
    req.body.gender!=undefined ? operation.gender=req.body.gender : delete operation.gender
    req.body.image!=undefined ? operation.image=req.body.image : delete operation.image
    //req.body.books!=undefined? operation.books=req.body.books:delete operation.books
    await Author.updateOne({_id:req.params.id},
        { $set: operation })
    res.send("DONE!")
});

router.post("/", async (req, res) => {
    await Author.create({name:req.body.name, age:req.body.age, nationality:req.body.nationality, image:req.body.image, gender:req.body.gender })
    res.send("DONE!")
});

module.exports = router;