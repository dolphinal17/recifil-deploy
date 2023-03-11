const express= require ('express');
const {res, req} = require ('express');
const rootrouter = require ('./routes/controller/CRUD-UserAccount');
const UserPost = require ('./routes/controller/User-post');
const uploadImg = require ('./routes/controller/upload-img')
const SignUp = require ('./routes/controller/Signup-Auth')

//Middleware
const app = express()
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('"/home" root is for landing page');
    app.use('/user',rootrouter.routersignup)
    app.use(UserPost.PostRecipe)
    app.use('/user/UploadProfile',uploadImg.ImgController)
    app.use('/user/signup',SignUp.UserAccount)
    console.log('Server running in the Port: ' + PORT)
})