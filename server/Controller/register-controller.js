const { db } = require ('../Firebase/index');
const { getAuth} = require ('firebase-admin/auth')
const  admin  = require ('firebase-admin');

const registration =  async (req, res) => {
    console.log("You're in register")
    const { email, password, firstname, lastname } = req.body;
   
    try {
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName : firstname +' '+ lastname,
            emailVerified: false,
            disabled: false
        })
        const verifiedlink = await admin.auth().generateEmailVerificationLink(email)

    console.log(userRecord);
    res.send(`User created successfully: ${userRecord.uid}`);
    console.log(verifiedlink);
   
    }
        
        
        catch (error) 
        {
            console.error(error);
            res.status(400).send('Error creating user');
        }
  }

  module.exports = { registration }