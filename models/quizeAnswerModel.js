const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 
const answerSchema = new Schema({
    selectedOptions:{
        type:String
    },
    question:{
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    quize:{
        type: Schema.Types.ObjectId,
        ref: 'Quize'
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Answer", answerSchema);