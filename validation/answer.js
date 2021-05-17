const joi = require('joi');

const schema = joi.object().keys({
    selectedOptions: joi.string().required(),
    question: joi.string().required(),
    quize: joi.string().required(),
})
module.exports = schema;