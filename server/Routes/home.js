const express = require ('express');
const { home, gethome } = require('../Controller/home-controller');
const { homevalidator } = require('../Controller/Validator/home-validator');
const router = express.Router();

router.post('/',homevalidator, home)
router.get('/get', gethome)


module.exports = router;