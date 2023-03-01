
const signupdata = require('../schema/Signupform');
const Profile = require ('../schema/Updateprofile');
const validationResultSchema = require('../middleware/validation-request-schema');
const { req, res, Router } = require('express');

//For database
const { db } = require ('../firebase/index')

const rootrouter = Router();

rootrouter.post('/user/CreateAccount',
 signupdata.registerdata,
 validationResultSchema,
async (req, res) => {
        
  try{
    
    const UsersJson= {
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Email: req.body.Email,
      Password: req.body.Password,
      ConfirmPassword: req.body.ConfirmPassword,

    }
    const response = await db.collection("users").add(UsersJson);
    res.sendStatus(201);
  }
  catch(error){
    res.send(error)
  }


})
//Update user firstname by ID in the data collection!!
rootrouter.post('/user/Update_UserProfile',
Profile.UserUpdate,
validationResultSchema,
async(req, res) =>{
  try {
    const id = req.body.Id;
    const newFirstname = req.body.Firstname;
    const newLastname = req.body.Lastname;
    const UserRef = await db.collection("users").doc(id)
    .update({
      Firstname: newFirstname,
      Lastname: newLastname
    });
      //read the new update  
    const UserUpdate = db.collection("users").doc(id);
    const response = await UserUpdate.get();
    res.send(response.data());

  } catch (error) {
    res.send(error)
  }
})



//Read All data in the collection!!
rootrouter.get('/user/View_all_User',async(req, res) => {
  try {
    const UserRef = db.collection("users");
    const response = await UserRef.get();
    let responseArr = [];

    //loop for each data in user
    response.forEach(doc => {
      responseArr.push(doc.data());
    });
    res.send(responseArr);
  } catch (error) {
    res.send(error)
  }
})

//Read one data by ID in the collection!!
rootrouter.get('/user/View_User/:id',async(req, res) => {
      try {
        
        const UserRef = db.collection("users").doc(req.params.id);
        const response = await UserRef.get();
        res.send(response.data())
      } catch (error) {
        res.send(error);
      }
})



//Delete user by ID in the data collection!!
rootrouter.delete('/user/Delete_User/:id',async(req, res) => {
  try {
    const response = await db.collection("users").doc(req.params.id).delete();
    //res.send(response);
    res.status(200).send('Successfully Deleted!!')
   } catch (error) {
    res.send(error)
  }
})

exports.routersignup = rootrouter;


