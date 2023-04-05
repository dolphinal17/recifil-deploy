
const { db } = require ('\../../Firebase/index')

const GetSidedish =  async (req, res) => {
    const category = ("sidedish");
    const querySnapshot = await db.collection('recipes')
    .where('dishcategory', 'array-contains', category)
    .get();
    const recipes = [];
    
    querySnapshot.forEach((doc) => {
      const recipeData = doc.data();
      recipes.push({ id: doc.id, ...recipeData });
    })
  console.log(recipes);
  res.send(recipes)
    
}





module.exports = { GetSidedish };