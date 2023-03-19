const admin = require ('firebase-admin')
const { req, res, Router } = require('express');
const User_PostRecipe = require ('../../schema/UserPostRecipe')

// //For database
const { db } = require ('../../firebase/index');
const { body } = require('express-validator');



const UserPost = Router();


UserPost.post('/',
async (req, res) => {
  const now = new Date();
  const timestamp =  admin.firestore.Timestamp.now();
  const date = timestamp.toDate();
  try{
    console.log("Userpost Success");
    const UserJson= {
          RecipeName: req.body.RecipeName,
          RecipeAbout: req.body.RecipeAbout,
          Main_Ingredients:req.body.Main_Ingredients,
          Category:req.body.Category,
          Ingredients_map:
          {
          Ingredients:req.body.Ingredients,
          Measurements:req.body.Measurements,
          },
          Recipe_Process: req.body.Recipe_Process,
          Status: ("Status") != true,
          Comment: null,
          favorite: null,
          timestamp: date,
          Time: req.body.Time
    }
    console.log(UserJson);
    const response = await db.collection("UserPost").add(UserJson);
    res.send(UserJson);
  }
  catch(error){
    res.send(error)
  }
})
UserPost.get('/getpost',
async (req, res) => {
        
  try {
    const UserPost = db.collection("UserPost");
    const response = await UserPost.get();
    let responseArr = [];

    //loop for each data in user
    response.forEach(doc => {
      responseArr.push(doc.data());
    });
    res.send(responseArr);
  }
  catch(error){
    res.send(error)
  }


})



exports.PostRecipe = UserPost;