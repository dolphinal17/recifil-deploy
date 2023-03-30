const express = require ('express');



const router = express.Router();

router.get('/library', async (req, res) => {
    const category = ("Maindish");
    const querySnapshot = await db.collection('recipes')
    .where('dishcategory', 'array-contains-any', category)
    .get();
    const results = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const filtereddish = data.dishcategory.filter((ingredient) => {
        return !FilterIn.includes(ingredient.toLowerCase())
      });
        results.push({data});
        // results.push(doc.id);
      
      
    });
    res.send(results);
      
})





module.exports = router;