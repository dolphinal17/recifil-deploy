
const { req, res, Router } = require('express');
const User_PostRecipe = require ('../../schema/UserPostRecipe')

// //For database
const { db } = require ('../../firebase/index')



const UserPost = Router();


UserPost.post('/user/PostRecipe',
async (req, res) => {
        
  try{
    console.log("Hello World");
    const UserJson= {
          RecipeName: req.body.RecipeName,
          RecipeAbout: req.body.RecipeAbout,
          RecipeIngredients: req.body.RecipeIngredients,
          RecipeProcess: req.body.RecipeProcess
    }
    const rp = req.body.RecipeProcess;
    console.log(UserJson);

    const response = await db.collection("UserPost").add(UserJson);
    res.sendStatus(201);
  }
  catch(error){
    res.send(error)
  }


})

exports.PostRecipe = UserPost;