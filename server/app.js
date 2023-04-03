const express = require ('express');
const cors = require('cors');
const {res, req} = require ('express');
const basket  = require('./Routes/basket-filter');
const  register  = require('./Routes/user/register-user');
const maindish = require ('./Routes/dish/maindish')

//Middleware
const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/register',register);
app.use('/recifil-deploy', basket);
app.use('/library',maindish);
app.get('/api', (req, res) => {
    res.json({message :"UserOne , UserTwo" })
})

module.exports = app;