const joi = require('joi')

const { movieIdSchema } = require('./movies')
const { userIdSchema } = require('./users')


const userMovieIdSchema = joi.string().regex(/^[a-zA-Z0-9]{3,30}$/);


const createUserMovieSchema = joi.object({
  userId: userIdSchema.required(),
  movieId: movieIdSchema.required()
});

module.exports = {
  userMovieIdSchema,
  createUserMovieSchema
};
