const  admin  = require ('firebase-admin');
const { req, res, Router } = require('express');
const { db } = require ('../firebase/index');
const signupdata = require('./validator/Signupform');
const { user } = require('firebase-functions/v1/auth');

const SignUp = Router();

SignUp.post('/',
signupdata.registerdata,
 async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    const user = admin.auth().currentUser;
    try {
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName : firstname +' '+ lastname,
       emailVerified: false,
        disabled: false
      });

      console.log(userRecord);
      res.send(`User created successfully: ${userRecord.uid}`);
    } catch (error) {
      console.error(error);
      res.status(400).send('Error creating user');
    }
  });



exports.UserAccount = SignUp
