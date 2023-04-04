const express = require ('express');
const { db } = require ('../../Firebase/index')



const router = express.Router();

router.get('/alldish', async (req, res) => {
    const querySnapshot = await db.collection('recipes')
    .get();
    const recipes = [];
    
    querySnapshot.forEach((doc) => {
      const recipeData = doc.data();
      recipes.push(recipeData);
    })
 
  res.send(recipes); // Return the recipes array as the response
})





module.exports = router;