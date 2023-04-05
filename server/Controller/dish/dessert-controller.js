
const { db } = require ('../../Firebase/index')


const GetDessert = async (req, res) => {
    const category = ("dessert");
    const querySnapshot = await db.collection('recipes')
    .where('dishcategory', 'array-contains', category)
    .get();
    const recipes = [];
    
    querySnapshot.forEach((doc) => {
      const recipeData = doc.data();
      recipes.push({ id: doc.id, ...recipeData });
    })
  res.send(recipes);
    
}


module.exports = { GetDessert };