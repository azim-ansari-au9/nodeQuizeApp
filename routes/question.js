var express = require('express');
var router = express.Router();
const { addQuestion, 
    allQuestion, 
    singleQuestionDetails, 
    quizeQuestion, 
    totalAggregateMarks
} = require('../controllers/quizeQuestionController');


router.post('/',addQuestion);
router.get('/',allQuestion);
router.get('/:questionId',singleQuestionDetails);
router.get('/quizes/:quizeId', quizeQuestion);
router.get('/total-marks/:quizeId', totalAggregateMarks);

module.exports = router;