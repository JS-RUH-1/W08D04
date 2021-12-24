const express = require("express");
const router = express.Router();
const authors = require("../author");
// get all posts
router.get("/", async (req, res) => {
  const allAuthors = await authors.find();
  res.json(allAuthors);
});

// add new post
router.post("/", async (req, res) => {
  const post = new authors({
    ...req.body,
  });
  await post.save();
  res.send(post);
});

// update post
router.put("/:id", async (req, res) => {
  await authors.findByIdAndUpdate(req.params.id, {
    ...req.body,
  });
  // Send response in here
  res.send("Item Updated!");
});


// delete post
router.delete("/:id", async (req, res) => {

    await authors.deleteOne({ _id: req.params.id });
    res.status(204).send();
});

module.exports = router;
