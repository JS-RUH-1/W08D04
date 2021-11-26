// فائدة هذا الملف يحول لي على أكثر من (router)
// نعرف الراوتر وهو اوبجيكت نستخدمه عشان يوجه الريكويست للمكان المطلوب

const router = require('express').Router(),
//BookRoutes = require ('../routes/book')
BookRoutes = require ('./book')

router.use('/books' , BookRoutes)


module.exports= router
// router هذا اللي عرفناه في نفس الملف ذا 