const express = require ('express');
const { db } = require ('../../Firebase/index')



const router = express.Router();

router.get('/sidedish', async (req, res) => {
    const category = ("sidedish");
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