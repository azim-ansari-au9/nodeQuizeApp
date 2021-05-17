var express = require('express');
const {answerCheck, updateAnswer, answerValidate  } = require('../controllers/answerController')
var router = express.Router();

router.post('/', answerCheck);
router.put('/:questionId', updateAnswer);
router.get('/marks', answerValidate);



module.exports = router;