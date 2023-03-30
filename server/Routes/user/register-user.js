const express = require ('express')
const { req, res, Router } = require('express');
const { registration } = require('../../Controller/register-controller');
const registervalidation = require('../../Controller/Validator/register-validator');
const schema = require ('../../Controller/schema/register-schema');
const router = express.Router();

router.post('/',schema.registration, registervalidation, registration);

module.exports = router;
