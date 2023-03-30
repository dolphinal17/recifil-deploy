const express= require ('express');
const {res, req} = require ('express');
const basket  = require('./Routes/basket-filter');
const homeroutes = require ('./Routes/home');
const  register  = require('./Routes/user/register-user');

//Middleware
const app = express()
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

app.use('/home', homeroutes);
app.use('/register',register);
app.use('/basket', basket);
app.get('/api', (req, res) => {
    res.json({"user":["UserOne","UserTwo","Userthree","Userfour"] })
})

module.exports = app;