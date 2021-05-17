var express = require('express');
var router = express.Router();
const questionRouter = require('./question');
const quizeRouter = require('./quize');
const answerRouter = require('./answer');

// const api_url = 'http://localhost:3000/api'
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quize App' });
});
router.get('/questions', function(req, res, next) {
  res.render('Question', { title: 'Question' });
});
router.get('/dashboard', function(req, res, next) {
  res.render('DashBoard', { title: 'Dashboard' });
});

router.use('/quize',quizeRouter);
router.use('/question',questionRouter);
router.use('/answer',answerRouter);

module.exports = router;
