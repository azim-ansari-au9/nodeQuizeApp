const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 
const quizeQuestionSchema = new Schema({
    questionText : {
        type: String,
        requires: true
    },
    options: {
        type:Array,
        required: true,
        default:[]
    },
    correctAnswer : {
        type: String,
        requires: true
    },
    questionMarks:{
        type:Number,
        reuired: true,
        default:10
    },
    isCorrect: {
        type: Boolean,
        dafault: false,
        reuired: true
    },
    quize:{
        type: Schema.Types.ObjectId,
        ref: 'Quize'
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("Question", quizeQuestionSchema);