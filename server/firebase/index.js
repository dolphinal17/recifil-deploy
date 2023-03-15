const { initializeApp, cert } = require ('firebase-admin/app'); 
const admin = require ('firebase-admin');
const { getFirestore } = require ('firebase-admin/firestore');
const serviceAccount = require('./service_account.json');
const { getStorage } = require('firebase-admin/storage');

require('dotenv').config()


initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://recifil-default-rtdb.firebaseio.com",
    storageBucket: 'gs://recifil.appspot.com'
});


const db = getFirestore();
const getst = getStorage();





module.exports = { db , getst };