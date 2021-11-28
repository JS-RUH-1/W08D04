const express = require('express');
const router = express.Router();
const Books = require('../models/booksAndAuthors').Books;
const mongoose = require('mongoose');
const cors = require('cors');
router.use(cors());
router.use(express.urlencoded({extended: true}))
router.use(express.json())

main().catch((err) => console.log(err))
async function main(){
    await mongoose.connect('mongodb+srv://admin:js-ruh2021@js.cj74d.mongodb.net/W08D04HW?retryWrites=true&w=majority')
}

router.get('/', (req, res) => {
    res.send("You cannot access this page")
})

router.get('/getBooks', (req, res) => {
    Books.find({}, (err, data) => {
        if(err){ console.log(err) }
        res.send(data)
        mongoose.connection.close;
    })
})

router.get('/userBooks', (req, res) => {
    Books.find({}, (err, data) => {
        if(err){ console.log(err) }
        //console.log(data.slice(7, data.length))
        res.send(data.slice(7, data.length))
    })
})

router.post('/addBook', (req, res) => {
    Books.create({
        title: req.body.title,
        pages: req.body.pages,
        price: req.body.price,
        image: req.body.image
    }, (err, res) => {
        if(err){ console.log(err) }
        mongoose.connection.close;
    })
    res.redirect('http://localhost:3000');
})

router.post('/updateBook', (req, res) => {
    Books.updateOne({_id: req.body.bookId}, 
        {
            title: req.body.title, 
            pages: req.body.pages, 
            price: req.body.price,
            image: req.body.image
        }, (err, res) => {if(err){ console.log(err) }; mongoose.connection.close;})
    res.redirect('http://localhost:3000/UserBooks')
})

router.post('/deleteBook', (req, res) => {
    Books.deleteOne({_id: req.body.bookId}, (err, res) => {
        if(err){console.log(err)}
        mongoose.connection.close;
    })
    res.redirect('http://localhost:3000/UserBooks')
})




module.exports = router;