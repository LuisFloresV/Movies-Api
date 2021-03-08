const joi = require('joi')

const userIdSchema = joi.string().regex(/^[a-zA-Z0-9]{3,30}$/);


const createUserSchema = joi.object({
  name: joi.string().max(100).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  isAdmin: joi.boolean()
});

module.exports = {
  userIdSchema,
  createUserSchema
};
