const { db } = require ('../../firebase/index');
const { req, res, Router } = require('express');


const Basket = Router();

Basket.get('/',
async (req, res) => {
        console.log('You are in Basket features...')
        const querySnapshot = await db.collection('UserPost')
        .where('Ingredients_map.Ingredients', 'array-contains', 'Onion')
        .get();
        // const docIds = querySnapshot.docs.map(doc => doc.id);
        // res.send(docIds)
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const filteredIngredients = data.Ingredients_map.Ingredients.filter((ingredient, index) => {
          return ingredient.includes('Onion');
        });
        console.log(doc.id, '=>', filteredIngredients);
      });

})
Basket.post('/In', async (req, res) => {
    const ingredients = req.body.IngredientsName;
    // const ingredientout = req.body.filterOut;
    if (!Array.isArray(ingredients)) {
        return res.status(400).send({ message: 'You need two or more ingredients to filter IN' });
      }
    const querySnapshot = await db.collection('UserPost')
      .where('Ingredients_map.Ingredients', 'array-contains-any', ingredients)
    //   .where(ingredientout, "==", undefined, { ignoreUndefinedProperties: true })
    //   .where('Ingredients_map.Ingredients', 'array-contains', ingredientout)
    //   .where('Ingredients_map.Ingredients', '!array-contains', ingredientout)
      .get();
    
    const results = [];
    
    querySnapshot.forEach((doc) => {
        const data = doc.data();
      const filteredIngredients = data.Ingredients_map.Ingredients.filter((ingredient) => {
        return !ingredients.includes(ingredient.toLowerCase());
      });
      if (filteredIngredients.length === data.Ingredients_map.Ingredients.length) {
   
        results.push(doc.id);
        
      }
    });

console.log(results);
res.send(results);
  });




exports.filter = Basket;

