const express = require ('express');
const { GetMaindish } = require('../../Controller/dish/maindish-controller');



const router = express.Router();

router.get('/alldish/maindish', GetMaindish)



module.exports = router;