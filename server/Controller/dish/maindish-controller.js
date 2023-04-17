
const { db } = require ('../../Firebase/index')


const GetMaindish = async (req, res) => {
    const category = ("maindish");
    const querySnapshot = await db.collection('recipes')
    .where('dishcategory', 'array-contains', category)
    .get();
    const recipes = [];
    
    querySnapshot.forEach((doc) => {
      const recipeData = doc.data();
      recipes.push({ id: doc.id, ...recipeData });
    })
  
  res.send(recipes); // Return the recipes array as the response
}





module.exports = { GetMaindish };