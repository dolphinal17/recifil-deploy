const express = require ('express');

const home = (req, res) =>  {
    res.json({
        successfull: true,
        data: req.body
    });
};
const gethome = (req,res) =>{
    res.json({
        successfull: true,
        data: [{ id: 1 , text: 'Youre in Homepage' }],
    });
}; 

module.exports = {
    home,
    gethome
}