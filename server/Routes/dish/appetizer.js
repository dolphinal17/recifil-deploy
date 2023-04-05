const express = require ('express');
const { GetAppetizer } = require('../../Controller/dish/appetizer-controller');




const router = express.Router();

router.get('/alldish/appetizer', GetAppetizer);



module.exports = router;