const { body } = require ('express-validator')



const Profile = [
    body('Firstname').trim().isLength({ min: 1}).notEmpty().withMessage('Firstname is required'),
    body('Lastname').trim().isLength({ min: 1}).notEmpty().withMessage('Firstname is required'),
];

exports.UserUpdate = Profile;