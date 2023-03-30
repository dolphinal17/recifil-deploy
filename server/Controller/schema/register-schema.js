 const { body } = require ('express-validator');
 
const schema = [
        body('firstname').trim().isLength({ min: 1}).notEmpty().withMessage('Firstname is required'),
        body('lastname').trim().isLength({ min: 1}).notEmpty().withMessage('Firstname is required'),
        body('email').isEmail().withMessage('email must contain a valid email address '),
        body('password').trim().isLength({ min: 8 }).withMessage('Password is required'),
        body('confirmpassword').trim().isLength({ min: 8 }).withMessage('Confirm Password is required').custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Password confirmation does not match password');
            }
            
            return true;
          }),
        
    ];

exports.registration = schema;