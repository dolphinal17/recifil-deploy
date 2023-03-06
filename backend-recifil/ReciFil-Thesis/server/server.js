const express= require ('express');
const {res, req} = require ('express');
const rootrouter = require ('./routes/UserAccount');
const UserPost = require ('./routes/User_Post');

//Middleware
const app = express()
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.use(rootrouter.routersignup)
app.use(UserPost.PostRecipe)


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Server running in the Port: ' + PORT)
})