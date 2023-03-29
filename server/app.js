const express= require ('express');
const {res, req} = require ('express');
const UserPost = require ('./controller/User-post');
const ProfileImg = require ('./controller/upload-img');
const SignUp = require ('./controller/Signup-Auth');
const tryUploadImg = require ('./controller/UserPost_Img');
const Basket = require ('./controller/Basket-Filter')

//Middleware
const app = express()
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
console.log('"/home" root is for landing page');
app.use('/postrecipe',UserPost.PostRecipe);
app.use('/user/UploadProfile',ProfileImg.UploadImg);
app.use('/user/signup',SignUp.UserAccount);
app.use('/tryupload', tryUploadImg.ImgTrial);
app.use('/basketfilter', Basket.filter);


module.exports =  app ;