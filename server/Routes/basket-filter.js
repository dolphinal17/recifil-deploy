const express = require ('express');
const { Basketfilter } = require('../Controller/basket-controller');
const router = express.Router();


router.post('/filter', Basketfilter);


    
router.get('/',
    async (req, res) => {
            console.log('You are in Basket features...')
            const querySnapshot = await db.collection('UserPost')
            // .where('Ingredients_map.Ingredients', 'array-contains-any', ['Onion','Ginger'])
            .get();
            // const docIds = querySnapshot.docs.map(doc => doc.id);
            // res.send(docIds)
        
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const filteredIngredients = data.Ingredients_map.Ingredients.filter((ingredient,index) => {
            return ingredient.includes('Onion','Ginger');
            });
            console.log(doc.id, '=>', filteredIngredients);
        });

    })


    
    
    
    

  module.exports = router;