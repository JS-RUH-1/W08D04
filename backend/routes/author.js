const express = require('express');
const router = express.Router();
const Authors = require('../models/booksAndAuthors').Authors;
const mongoose = require('mongoose');
const cors = require('cors');
router.use(cors());
router.use(express.urlencoded({extended: true}))
router.use(express.json())

main().catch((err) => console.log(err))
async function main(){
    await mongoose.connect('mongodb+srv://...')
}

router.get('/', (req, res) => {
    res.send("You cannot access this page")
})

router.get('/getAuthors', (req, res) => {
    Authors.find({}, (err, data) => {
        if(err){ console.log(err) }
        res.send(data)
    })
})

router.post('/addAuthor', (req, res) => {
    Authors.create({
        name: req.body.name,
        age: req.body.age,
        nationality: req.body.nation,
        image: req.body.image,
        gender: req.body.gender,
        books: 
            [{
                    title: " ",
                    pages: 0,
                    price: 0,
                    image: " "
                }]
    }, (err, res) => {if(err) console.log(err) })
    res.redirect('http://localhost:3000/Authors')
})

router.post('/updateAuthor', (req, res) => {
    Authors.updateOne({_id: req.body.authorId}, 
        {
            name: req.body.name, 
            age: req.body.age, 
            nationality: req.body.nationality,
            image: req.body.image

        }, (err, res) => {if(err){ console.log(err) }; mongoose.connection.close;})
    res.redirect('http://localhost:3000/Authors')
})

router.post('/deleteAuthor', (req, res) => {
    Authors.deleteOne({_id: req.body.bookId}, (err, res) => {
        if(err){console.log(err)}
        mongoose.connection.close;
    })
    res.redirect('http://localhost:3000/Authors')
})

module.exports = router;