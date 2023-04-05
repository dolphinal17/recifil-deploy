const express = require ('express');
const { db } = require ('../../Firebase/index')



const router = express.Router();

router.get('/alldish/appetizer', async (req, res) => {
    const category = ("appetizer");
    const querySnapshot = await db.collection('recipes')
    .where('dishcategory', 'array-contains', category)
    .get();
    const recipes = [];
    
    querySnapshot.forEach((doc) => {
      const recipeData = doc.data();
      recipes.push({ id: doc.id, ...recipeData });
    })
  res.send(recipes);
    
})





module.exports = router;