const express = require ('express');
const { GetDessert } = require('../../Controller/dish/dessert-controller');

const router = express.Router();

router.get('/alldish/dessert', GetDessert)





module.exports = router;