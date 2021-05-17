const Answer = require('../models/quizeAnswerModel');
const mongoose = require('mongoose');

exports.addAnswer = ( questionId, data) => {
    return Answer.create( questionId, data);
}

exports.modifyAnswer = (answerId, data) => {
    return Answer.findByIdAndUpdate(answerId, data,{new: true});
}

exports.answerMarks=(answerId) => {
    return Answer.findOne(mongoose.Types.ObjectId(answerId))
}

