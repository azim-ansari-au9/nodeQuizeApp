const Quize = require('../models/quizeModel');
const mongoose = require('mongoose');

exports.quizeAdd = (data) =>{
    return Quize.create(data)
}
exports.findQuizeByName =(name) =>{
    return Quize.findOne({name:name});
}
exports.allQuize = () => {
    return Quize.find();
}
exports.singleQuize = (quizeId) => {
    // console.log(quizeId)
    return Quize.findOne(mongoose.Types.ObjectId(quizeId));
}


