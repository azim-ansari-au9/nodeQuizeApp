const config = require('../config/config');
const mongoose = require('mongoose');

//connecting database 
const mongoInit = async ()=>{
    try {
        await mongoose.connect(config.db.connectionString,config.db.options)
        console.log("Connected to Database yeah !!")
    } catch (e) {
        console.log(error.message)
    }
}

module.exports = mongoInit;