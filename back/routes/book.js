const express = require("express");
const router = express.Router();
const Books = require("../book");
// get all posts
router.get("/", async (req, res) => {
  const allBooks = await Books.find();
  res.json(allBooks);
});

// add new post
router.post("/", async (req, res) => {
  const post = new Books({
    ...req.body,
  });
  await post.save();
  res.send(post);
});

// update post
router.put("/:id", async (req, res) => {
  await Books.findByIdAndUpdate(req.params.id, {
    ...req.body,
  });
  // Send response in here
  res.send("Item Updated!");
});


// delete post
router.delete("/:id", async (req, res) => {

    await Books.deleteOne({ _id: req.params.id });
    res.status(204).send();
});

module.exports = router;
