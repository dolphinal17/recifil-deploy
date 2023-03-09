const { initializeApp, cert } = require ('firebase-admin/app'); 
const admin = require ('firebase-admin');
const { getFirestore } = require ('firebase-admin/firestore');
const serviceAccount = require('./service_account.json');

require('dotenv').config()


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://recifil-default-rtdb.firebaseio.com",
    storageBucket: process.env.BUCKET_URL
});


const db = getFirestore();





module.exports = { db, admin};