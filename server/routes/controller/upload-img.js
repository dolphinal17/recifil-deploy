const { Router } = require('express');
const { initializeApp } = require ('firebase/app');
const multer = require ('multer');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require ('firebase/storage');
const firebaseConfig = {
    apiKey: "AIzaSyCHFx0B0krQVivgCkaOPhLmMx8tfdV7Qso",
    authDomain: "recifil.firebaseapp.com",
    databaseURL: "https://recifil-default-rtdb.firebaseio.com",
    projectId: "recifil",
    storageBucket: "recifil.appspot.com",
    messagingSenderId: "986428398442",
    appId: "1:986428398442:web:d43a57605bffe2f3a6a313",
    measurementId: "G-BF98SLQW1L"
  };



const uploadImg = Router();
//initialize a firebase application
const firebaseApp = initializeApp(firebaseConfig);

//Initialize Cloud Storage and get a reference to the service 
const storage = getStorage(firebaseApp);


const upload = multer({ storage: multer.memoryStorage(), dest: 'file/' });
uploadImg.post('/',upload.single("filename"), async (req,res)=>{
    console.log("Upload is Running")
    try {
        
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, req.file.originalname + "   " + dateTime)

        //Create file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        }

        //Upload the file in the bucket bucket storage 
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        //Grab the Public Url 
        const downloadURL = await getDownloadURL(snapshot.ref); 

        console.log('File successfully uploaded.');
        return res.send({
            message: 'file uploaded to firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })


    } catch (error) {
        return res.status(400).send(error.message);
    } 
});

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + (today.getDay() + 1);
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() ;
    const dateTime = date + ' ' + time ;
    return dateTime;
} 


uploadImg.get('/upload', (req, res) => {
  res.json("Storage");
})

///


exports.ImgController = uploadImg;