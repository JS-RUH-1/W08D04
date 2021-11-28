const express = require('express')
const { Auther} = require('../Models/bookAndAuther')
const authorRouter = express.Router()


authorRouter.use(express.json())

authorRouter.get('/getAuthor', async (req, res) => {
   const allAuthor = await Auther.find()
   res.send(allAuthor)
})

authorRouter.post('/postAuthor', (req, res) => {
    console.log("post")
    const newAuthor = new Auther({
        name: req.body.name,
        age: req.body.age,
        nationality: req.body.nationality,
        image: req.body.image,
        gender: req.body.gender,
        // books: []
    })
    newAuthor.save()
     
            console.log(res)
            const allAuthor1 = Auther.find()
            res.send(allAuthor1)

})

authorRouter.put('/update/:id', async (req, res) => {
    const updatedAuthor = await Auther.findByIdAndUpdate(req.params.id, { $set: req.body })
    res.send(updatedAuthor)
})

authorRouter.delete('/delete/:id', async (req, res) => {
    const deletedAuthor = await Auther.findByIdAndRemove(req.params.id)
    res.send(deletedAuthor)
})

authorRouter.get('/authorDetails/:id', async (req, res) => {
    const authorDetails = await Auther.findById(req.params.id)
    res.send(authorDetails)
})


module.exports = authorRouter