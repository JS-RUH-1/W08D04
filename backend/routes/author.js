const express =require("express")
const router=express.Router()
const Author = require('../Models/AuthorSchema')
const AuthorSeed = require('../author_seed')

router.use(express.json());

//  Author.insertMany(AuthorSeed, (err, authors) => {
//         if (err){ console.log(err)}
//           console.log("added provided authors data", authors)
//         });

        router.get('/home', async (req , res)=>{
          // اما بهذه الطريقه او استخدم try
          const authors = await Author.find() 
          // اختار البيانات من (Author) عشان اخذ البيانات من db
          console.log("We are online")
          // console.log(object)
          res.send(authors)
      })
      // _____________________________________________________________
      router.post('/post' , async (req,res)=>{
        const auth = new Author({
          name : req.body.name,
          age :req.body.age,
          nationality: req.body.nationality,
          image: req.body.image,
          gender: req.body.gender,
          books: req.body.books
        })
        console.log(Author)
        // Author.push(newAuthor);
        // res.send(Author)
        try {
          await auth.save()
          res.status(201).send(Author)
        }
        catch(e){
          console.error(e)
        }
        {
          console.log("Added")
        }
      })
// _________________________________________________________________
      router.delete("/delete/:id", async (req, res) => {
        try{
          const auth = await Author.findByIdAndDelete({_id: req.params.id});
          if (!auth){
          return res.status(404).send()
        }
      
        res.send(auth);
      }
      catch(e){
        res.status(500).send()
        console.error(e)
      }
      });
      // ______________________________________________________________
      router.patch('/update/:id', async (request,response)=> {
        const allowedUpdates = ['name', 'age', 'nationality', 'image', 'gender', 'books'];
        const updates = Object.keys(request.body)
        const isValidOperation  = updates.every((update)=> allowedUpdates.includes(update))
        if(!isValidOperation) {
            return response.status(400).send({erro: 'Invalid updates'});
        }
        try {
            const autho = await Author.findOne({_id: request.params.id});
            if(!autho) {return response.status(404).send(404).send()}
            updates.forEach((update)=> {
              autho[update] = request.body[update]
            })
            await autho.save()
            response.status(200).send(autho)
        } catch(e){
            response.status(400).send(e)
            console.error(e)
        }
     })

module.exports=router
   