const { initializeApp, cert } = require ('firebase-admin/app');
const auth = require ('firebase/auth')
const { getFirestore } = require ('firebase-admin/firestore');
const serviceAccount = require('./service_account.json');

require('dotenv').config()


initializeApp({
    credential: cert(serviceAccount),
    databaseURL: "https://recifil-default-rtdb.firebaseio.com",
    storageBucket: process.env.BUCKET_URL
});


const db = getFirestore();



module.exports = { db, auth};