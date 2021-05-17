const createError = require("http-errors");
const { addAnswer , modifyAnswer, answerMarks} = require("../services/answerServices");
const {questionDetails} = require("../services/quizeQuestionServices");
const answerJoi = require("../validation/answer");


exports.answerCheck = async (req, res, next) =>{
    try {
        const value = await answerJoi.validateAsync(req.body);
        const newAnswer = await addAnswer(value);
        return res.status(201).json({status: "Answer submitted successfully", answerData: newAnswer})
    } catch (err) {
        console.log(err)
        next(new createError(500, "Server Error"));
    }
}

exports.updateAnswer = async (req, res, next) =>{
    try {
        if(!req.body.answerId) {
            return next(new createError(500, "please provide a answerId"));
        }
        const value = await modifyAnswer(req.body.answerId,req.body)
        return res.status(200).json({status: "Answer updated successfully", answerData: value})
    } catch (err) {
        console.log(err)
        next(new createError(500, "Server Error"));
    }
}

exports.answerValidate = async (req, res, next) =>{
    try {
        const answerId = req.query.answerId;
        const questionId = req.query.questionId;
        if(answerId == 'undefined' || null){
            return res.status(422).json({status: "AnswerId is undefined pease check"})
        } else {
            const data = await answerMarks(answerId);
            const questionData = await questionDetails(questionId);
            if(data.selectedOptions !== questionData.options[1].correctAnswer){
                return res.status(400).json({status:"Incorrect answer", agreegateMakrs: 0})
            } else{
                return res.status(200).json({status: "Answer updated successfully", agreegateMakrs:questionData.questionMarks})
            }

        }
    } catch (err) {
        console.log(err)
        next(new createError(500,"Server Error"));
    }
}

// exports.marksTotal = async(req, res, next) => {
//     try {
//         const categoryId = req.params.categoryId;
//         const q
//         const data = await attempedQuestionMarks(categoryId, questionId);
//         // console.log(data)
//         console.log(data)
//     } catch (err) {
//         console.log(err)
//         next(new createError(500,"Server Error"));
//     }
// }

// [
//     {
//       '$match': {
//         'category': new ObjectId('6098bbf782e2a53bc8b2c68d')
//       }
//     }, {
//       '$lookup': {
//         'from': 'questions', 
//         'localField': 'answers', 
//         'foreignField': 'questions', 
//         'as': 'questions'
//       }
//     }, {
//       '$unwind': {
//         'path': '$questions'
//       }
//     }, {
//       '$match': {
//         'questions.category': new ObjectId('6098bbf782e2a53bc8b2c68d')
//       }
//     }
//   ]