const express = require ('express');
const { db } = require ('../../Firebase/index')



const router = express.Router();

router.get('/alldish/sidedish', async (req, res) => {
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
  res.send(recipes)
    
})





module.exports = router;