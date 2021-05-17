const Question = require('../models/quizeQuestionModel');
const {ObjectId} = require('mongodb');
const mongoose = require('mongoose');


exports.addQuestion = (data)=>{
    return Question.create(data)
}

exports.questionDetails = (questionId)=>{
    return Question.findById(mongoose.Types.ObjectId(questionId))
}

exports.allQuestion = () => {
    return Question.find()
}

exports.quizeMarks = (quizeId) =>{
  // console.log(quizeId)
    return Question.aggregate(
      [
        {
          '$match': {
            'quize': mongoose.Types.ObjectId(quizeId),
          }
        }, 
        {
          '$group': {
            '_id': mongoose.Types.ObjectId(quizeId), 
            'TotalMarks': {
              '$sum': '$questionMarks'
            }
          }
        }
      ]
      )
}

exports.countQuestion = (quizeId) => {
  return Question.aggregate(
    [
      {
        '$match': {
          'quize': ObjectId(quizeId)
        }
      }, {
        '$count': 'number of questions'
      }
    ]
  )
}

// exports.checkAnswer = (questionId, data) => {
//   return Question.findOneAndUpdate(questionId,data)
// }

// exports.submitAnswers = (questionId, data) => {
//   return Question.findById(questionId,data,{new: true});
// }

exports.questionByQuize = (quizeId) => {
  return Question.find({quize:mongoose.Types.ObjectId(quizeId)})
}


exports.attempedQuestionMarks= (quizeId)=>{
  console.log(quizeId)
  return Question.aggregate(
    // [
    //   {
    //     '$match': {
    //       'category': ObjectId(quizeId)
    //     }
    //   }, {
    //     '$lookup': {
    //       'from': 'answers', 
    //       'as': 'answer', 
    //       'localField': '_id', 
    //       'foreignField': 'question'
    //     }
    //   }
    // ]
    [
      {
        '$match': {
          'quize': ObjectId(quizeId)
        }
      }, {
        '$lookup': {
          'from': 'answers', 
          'as': 'answer_list', 
          'localField': '_id', 
          'foreignField': 'question'
        }
      }, {
        '$unwind': {
          'path': '$answer_list'
        }
      }, {
        '$project': {
          'quize': ObjectId(quizeId), 
          'correctAnswer': '$options.correctAnswer', 
          'selectedAnswer': '$answer_list.selectedOptions', 
          'questionMarks': '$questionMarks', 
          'number of question': ''
        }
      }, {
        '$unwind': {
          'path': '$correctAnswer'
        }
      }, {
        '$project': {
          'quize': ObjectId(quizeId), 
          'questionMarks': '$questionMarks', 
          'aggregateMarks': {
            '$cond': {
              'if': {
                '$eq': [
                  '$correctAnswer', '$selectedAnswer'
                ]
              }, 
              'then': '$questionMarks', 
              'else': 0
            }
          }
        }
      }, {
        '$group': {
          '_id': {
            'quize': ObjectId(quizeId)
          }, 
          'TotalMarks': {
            '$sum': '$questionMarks'
          }, 
          'aggregateMarks': {
            '$sum': '$aggregateMarks'
          }
        }
      }, {
        '$project': {
          'TotalMarks': '$TotalMarks', 
          'AggregateMarks': '$aggregateMarks', 
          'Percentage': {
            '$multiply': [
              {
                '$divide': [
                  '$aggregateMarks', '$TotalMarks'
                ]
              }, 100
            ]
          }
        }
      }
    ]
  )
}
