const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 
const quizeSchema = new Schema({
    name : {
        type: String,
        requires: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Quize", quizeSchema);