const quizeJoy = require('../validation/quize');
const {findQuizeByName, quizeAdd, allQuize, singleQuize} = require('../services/quizeServices');
const createError = require("http-errors");


exports.addQuize = async (req, res, next) =>{
    try {
        const {name} = req.body
        if(!name){
            return next(new createError(500,"please provide a name"))
        }
        const quizeObj = await findQuizeByName(req.body.name);
        if(quizeObj){
            return next(new createError(500,"This Quize allready exists"))
        }
        const value = await quizeJoy.validateAsync(req.body);
        let newQuize = await quizeAdd(value);
        return res.status(201).json({status:"Quize created successfully",result: newQuize})
        
    } catch (err) {
        next(new createError(500, "server error"));
    }
}

exports.allQuizes = async(req, res, next) => {
    try {
        const quize = await allQuize();
        return res.status(200).json({status:"sucessfully fetched",result: quize})
    } catch (err) {
        next(new createError(500, "Server Error"));
    }
}

exports.quizeDetails = async(req, res, next) => {
    try {
        const quizeDetail = await singleQuize(req.params.quizeId);
        return res.status(200).json({status:"sucessfully fetched",result: quizeDetail}); 
    } catch (err) {
        next(new createError(500, "Server Error"));
    }
}