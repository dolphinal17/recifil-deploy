const express = require ('express');
const { GetAlldish } = require('../../Controller/dish/alldish-controller');




const router = express.Router();

router.get('/alldish', GetAlldish);


module.exports = router;