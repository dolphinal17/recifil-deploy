const {res, req, next} = require ('express');
const {validationResult} = require ('express-validator');
// const { body } = require ('express-validator');


const registervalidation  = (req, res, next) =>
{
   
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
   }
   next();
}
module.exports = registervalidation;