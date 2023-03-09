const { body } = require ('express-validator')



const User_PostRecipe = [
    body('RecipeName').trim().isLength({ min: 3}).notEmpty().withMessage('This field is Required!!'),
    body('RecipeAbout').trim().isLength({ min: 3}).notEmpty().withMessage('This field is Required!!'),
    body('RecipeIngredients').trim().isLength({ min: 3}).notEmpty().isArray().withMessage('This field is Required!!'),
    body('RecipeProcess').trim().isLength({ min: 3}).notEmpty().isArray().withMessage('This field is Required!!'),
];

exports.Recipe_Form = User_PostRecipe;