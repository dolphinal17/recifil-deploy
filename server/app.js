const express = require ('express');
const cors = require('cors');
const {res, req} = require ('express');
const basket  = require('./Routes/basket-filter');
const  register  = require('./Routes/user/register-user');
const maindish = require ('./Routes/dish/maindish')
const alldish = require ('./Routes/dish/alldish')
const sidedish = require ('./Routes/dish/sidedish')
const dessert = require ('./Routes/dish/dessert')
const appetizer = require ('./Routes/dish/appetizer')
const { db} = require ('./Firebase/index')




//Middleware
const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/register',register);
app.use('/recifil-deploy', basket);
app.use('/library',alldish,maindish,sidedish,dessert,appetizer);
/////

app.get('/fav/alldish', async (req, res) => {
  const user = "u96UNPkQEBdmzpoKuFaNH1c04P63"
  const favoriteref = db.collection('userinfo').doc(user).collection('favorites');
 

    const recipes = [];
    
    favoriteref.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const recipeData = doc.data();
        recipes.push({ id: doc.id, ...recipeData });
      });
      res.send(recipes); // Return the recipes array as the response
    })
})






module.exports = app;