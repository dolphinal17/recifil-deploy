const express = require ('express');
const { db } = require ('../../Firebase/index')



const router = express.Router();

router.get('/apetizer', async (req, res) => {
    const category = ("apetizer");
    const querySnapshot = await db.collection('recipes')
    .where('dishcategory', 'array-contains', category)
    .get();
    const recipes = [];
    
    querySnapshot.forEach((doc) => {
      const recipeData = doc.data();
      recipes.push(recipeData);
    })
  console.log(recipes);
    
})





module.exports = router;