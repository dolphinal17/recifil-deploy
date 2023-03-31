const express = require ('express');
const { db } = require ('../../Firebase/index')



const router = express.Router();

router.get('/desset', async (req, res) => {
    const category = ("dessert");
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