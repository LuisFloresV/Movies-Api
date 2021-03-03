const boom = require('@hapi/boom')
const joi = require('joi')

function validate(data, schema) {
  schema = !joi.isSchema(schema) ? joi.object(schema) : schema;
  const { error } = schema.validate(data)
  return error
}

function validationHandler(schema, data = 'body') {
  return function (req, res, next) {
    const error = validate(req[data], schema)
    error ? next(boom.badRequest(error)) : next()
  }
}

module.exports = validationHandler