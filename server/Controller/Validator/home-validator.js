module.exports.homevalidator = (req, res, next) =>  {
    if(!req.body.text){
        return res.json({
            successful: false,
            error: { text: ['text is Required'] },
        });
    }
    next();
};
