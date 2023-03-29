const { Router, res, req } = require('express');
const multer = require('multer');
const fs = require ('fs');

const { getst } = require ('../firebase/index')

const ProfileImg = Router();


const upload = multer();
const bucket = getst.bucket();

ProfileImg.post('/upload',upload.single('Profile'), (req, res, next) => {

const folderName = 'file';
const folderName2 = 'User_Profile';
const fileName = req.file.originalname ;
const fileObjectPath = `${folderName}/${folderName2}/${fileName}`;
  const file = req.file;
  if (!file) {
    return next(new Error('No file uploaded.'));
  }

  // Upload the file to Firebase Storage
  const fileUpload = bucket.file(fileObjectPath);
  const stream = fileUpload.createWriteStream({
    metadata: {
      contentType: file.mimetype
    }
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = fileObjectPath;
    fileUpload.makePublic()
      .then(() => {
        req.file.cloudStoragePublicUrl = `https://storage.googleapis.com/${bucket.name}/${fileObjectPath}`;
        res.send('Image are Uploaded!!')
      })
      .catch((err) => {
        req.file.cloudStorageError = err;
        next(err);
      });
  });

  stream.end(file.buffer);

  });



exports.UploadImg = ProfileImg;
