var express = require('express');
const { addQuize,allQuizes , quizeDetails} = require('../controllers/quizeController');
var router = express.Router();

router.post('/',addQuize);
router.get('/',allQuizes);
router.get('/:quizeId',quizeDetails);

module.exports = router;