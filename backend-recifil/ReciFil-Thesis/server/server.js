const express= require ('express');
const {res, req} = require ('express');
const rootrouter = require ('./routes/controller/CRUD-UserAccount');
const UserPost = require ('./routes/controller/User-post');
const uploadImg = require ('./routes/controller/upload-img')

//Middleware
const app = express()
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.use(rootrouter.routersignup)
app.use(UserPost.PostRecipe)
app.use(uploadImg.ImgController)


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Server running in the Port: ' + PORT)
})