const joi = require('joi');

const schema = joi.object().keys({
    questionText:joi.string().required(),
    options:joi.array().required() ,
    questionMarks:joi.number().required(),
    quize: joi.string().required(),
    isCorrect: joi.boolean()
})
module.exports = schema;