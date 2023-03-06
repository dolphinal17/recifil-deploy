 const {res, req, next} = require ('express')
 const {validationResult} = require ('express-validator')
 

const validationResultSchema  = (req, res, next) =>
 {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    next();
}
module.exports = validationResultSchema;

