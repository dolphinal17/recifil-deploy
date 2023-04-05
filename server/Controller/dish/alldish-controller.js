
const { db } = require ('../../Firebase/index')



const GetAlldish = async (req, res) => {
    const querySnapshot = await db.collection('recipes')
    .get();
    const recipes = [];
    
    querySnapshot.forEach((doc) => {
      const recipeData = doc.data();
      recipes.push({ id: doc.id, ...recipeData });
    })
 
  res.send(recipes); // Return the recipes array as the response
}




module.exports = { GetAlldish };