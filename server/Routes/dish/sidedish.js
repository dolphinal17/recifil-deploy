const express = require ('express');
const { GetSidedish } = require('../../Controller/dish/sidedish-controller');



const router = express.Router();

router.get('/alldish/sidedish', GetSidedish)





module.exports = router;