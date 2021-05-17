const questionJoy = require('../validation/quizeQustion');
const {addQuestion,
    questionDetails,
    allQuestion, 
    quizeMarks,
    questionByQuize, 
    countQuestion,
    attempedQuestionMarks
} = require('../services/quizeQuestionServices');
const createError = require("http-errors");

exports.addQuestion = async(req, res) => {
    try {
        const value = await questionJoy.validateAsync(req.body)
        const newQuestion = await addQuestion(value)
        res.status(201).json({status:"Question added successfully", result:newQuestion})
    } catch (err) {
        next(new createError(500, "Server Error"));
    }
}

exports.singleQuestionDetails = async(req, res) => {
    try {
        const questionId = req.params.questionId;
        if(!questionId){
            return res.status(500).json({status:"please provide the questionId in parameter"})
        }
        const data = await questionDetails(questionId)
        return res.status(200).json({status:"Successfully fetched",questionDetails:data})
    } catch (err) {
        next(new createError(500, "Server Error"));
    }
}

exports.allQuestion = async(req, res) => {
    try {
        const data = await allQuestion()
        const count = data.length
        return res.status(200).json({status:"Successfully fetched",count,QuestionList:data})   
    } catch (err) {
        next(new createError(500, "Server Error"));
    }
}

//quizeMarks , categoryQuestionCount, categoryQuestionList
exports.quizeQuestion = async(req, res, next) => {
    try {
        const quizeId = await req.params.quizeId;
        const quizeTotalMarks = await quizeMarks(quizeId);
        // console.log(quizeTotalMarks)
        const makrs = quizeTotalMarks[0].TotalMarks;
        const quizeQuestions = await questionByQuize(quizeId);
        const questionCount = await countQuestion(quizeId);
        const count = questionCount[0]['number of questions'];
        return res.status(200).json({status:"Successfully fetched questions",
            result:{ quizeTotalMarks:makrs,questionCount:count,quizeQuestions}
        })
    } catch (err) {
        next(new createError(500, "Server Error"));
    }
}

exports.totalAggregateMarks =async(req, res, next) => {
    try {
        const quize = req.params.quizeId;
        const data = await attempedQuestionMarks(quize)
        console.log(quize)
        // console.log(data.map(key =>{
        //     console.log("key.answer",key.answer[0].selectedOptions)
        //     console.log("key.Options",key.options[1].correctAnswer)
        // }))
        res.status(200).json({status:'results', results:data})
    } catch (err) {
        console.log(err)
        next(new createError(500, "Server Error"));
    }
}


// exports.allCategoryMarks = async(req, res, next) => {
//     try {
//         const categoryId = await req.params.categoryId
//         const result = await categoryMarks(categoryId);
//         // const count = result.length;
//         // console.log(count)
//         return res.status(200).json({status:"successfully fetched results", result})
//     } catch (err) {
//         console.log(err)
//         next(new createError(500, "Server Error"));
//     }
// }

// exports.submitAnswer = async(req, res, next) => {
//     try {
//         const questionId = req.params.questionId;
//         if(questionId == 'undefined'){
//             return res.status(404).json({status:"please check questionId"})
//         }
//         const {selectedAnswer} = req.body;
//         const quesDetails = await questionDetails(questionId)
//         const isCorrect = quesDetails.isCorrect;
//         if(selectedAnswer !== quesDetails.options[1].correctAnswer){
//             return res.status(401).json({status:'Wrong !! Please go to next question',result: {selectedAnswer,isCorrect, agrregateMarks:0}})
//         } else {
//             return res.status(200).json({status:"you have selected correct answer",result: {selectedAnswer, isCorrect:true,agrregateMarks:quesDetails.questionMarks}})
//         }
//     } catch (err) {
//         next(new createError(500, "Server Error"));
//     }
// }

