const { db } = require ('../Firebase/index')

const Basketfilter = async (req, res) => {
    const FilterIn = req.body.IngredientsName;
    const FilterOut = req.body.Ingredientsout;
    if (!Array.isArray(FilterIn) || FilterIn.length < 2) {
        return res.status(400).send({ message: 'You need enter two or more ingredients to filter In' });
      }
    const querySnapshot = await db.collection('recipes')
      .where('ingredients', 'array-contains-any', FilterIn)
      .get();

    const results = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const filteredIngredients = data.ingredients.filter((ingredient) => {
        return !FilterIn.includes(ingredient.toLowerCase())
      });
        results.push({id: doc.id});
        // results.push(doc.id);
      
      
    });
    if (!Array.isArray(FilterOut) || FilterOut.length < 2) {
        return res.status(400).send({ message: 'You need enter two or more ingredients to filter out' });
      }
      const querySnapfilterout = await db.collection('recipes')
      .where('ingredients', 'array-contains-any', FilterOut)
      .get();
    const filterOut = [];
    querySnapfilterout.forEach((doc) => {
      const data = doc.data();
      const filteredoutIngredients = data.ingredients.filter((ingredient) => {
        return !filterOut.includes(ingredient.toLowerCase());
      });
      if (filteredoutIngredients.length === data.ingredients.length) {
        filterOut.push({
          id: doc.id
        });
      }
    }); 
        const myfilterout = filterOut.map(filter => filter.id)
     
        const myfilter = results
        .filter(result => !myfilterout.includes(result.id))
        .map(result => result.id)
      
      console.log(myfilter)
      res.send(results);
      // console.log(filterOut);
    
      }

      module.exports = { Basketfilter }