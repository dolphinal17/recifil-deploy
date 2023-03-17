
const { req, res, Router, response } = require('express');
const User_PostRecipe = require ('../../schema/UserPostRecipe');
const multer = require('multer');

// //For database
const { db } = require ('../../firebase/index');
const { body } = require('express-validator');


const upload = multer();
const UserPost = Router();


UserPost.post('/',upload.none(),
async (req, res) => {
        
  try{
    console.log("Userpost Success");
;
    const UserJson= {
          RecipeName: req.body.RecipeName,
          RecipeAbout: req.body.RecipeAbout,
          Main_Ingredients:req.body.Main_Ingredients,
          Category:req.body.Category,
          Ingredients_map: {
          Ingredients : req.body.Ingredients, 
          Measurements: req.body.Measurements
          },
          Status: ("Status") == false
    }
    const response = await db.collection("UserPost").add(UserJson);
    res.send(UserJson);
  }
  catch(error){
    res.send(error)
  }
})
UserPost.get('/getpost',
async (req, res) => {
        // try {
        //   const docRef = await db.collection('UserPost').doc('t6PSDo8FcCg3eLBtHDIi');

        //     docRef.get().then((doc) => {
        //       if (doc.exists) {
        //         const Ingredients_map = doc.data().Ingredients_map;
        //         const Ingredients = doc.data().Ingredients_map.Ingredients;
        //         const Measurements = doc.data().Ingredients_map.Measurements;
        //              console.log(`Ingredients: ${[Ingredients]}`);
        //              console.log(`Mesurements: ${[Measurements]}`);
        //             res.send(Ingredients_map);
        //       } else {
        //        console.log('No such document!');
        //        }
        //   })
        // }
        //   catch(error){
        //      console.log('Error getting document:', error);
        //       }
            
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