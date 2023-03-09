const { body } = require ('express-validator')




const signupdata = [
    body('Firstname').trim().isLength({ min: 1}).notEmpty().withMessage('Firstname is required'),
    body('Lastname').trim().isLength({ min: 1}).notEmpty().withMessage('Firstname is required'),
    body('Email').isEmail().withMessage('email must contain a valid email address '),
    body('Password').trim().isLength({ min: 8 }).withMessage('Password is required'),
    body('ConfirmPassword').trim().isLength({ min: 8 }).withMessage('Confirm Password is required').custom((value, { req }) => {
        if (value !== req.body.Password) {
          throw new Error('Password confirmation does not match password');
        }
        
        return true;
      }),
    
];

exports.registerdata = signupdata;