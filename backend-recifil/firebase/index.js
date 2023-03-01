const { initializeApp, cert, getApp } = require ('firebase-admin/app');
const admin = require ('firebase-admin')
const { getFirestore } = require ('firebase-admin/firestore');
const serviceAccount = require('./service_account.json');

initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();


module.exports = { db };