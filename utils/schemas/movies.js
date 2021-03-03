const joi = require('joi');

const movieIdSchema = joi.string().regex(/^[a-zA-Z0-9]{3,30}$/);
const movieTitleSchema = joi.string().max(80);
const movieYearSchema = joi.number().min(1888).max(2077);
const movieCoverSchema = joi.string().uri();
const movieDescriptionSchema = joi.string().max(300);
const movieDurationShema = joi.string().min(1).max(300);
const movieContentRatingShema = joi.string().max(5);
const movieSourceSchema = joi.string().uri();
const movieTagsSchema = joi.array().items(joi.string().max(50));

const createMovieSchema = joi.object({
  title: movieTitleSchema.required(),
  year: movieYearSchema.required(),
  cover: movieCoverSchema.required(),
  description: movieDescriptionSchema.required(),
  duration: movieDurationShema.required(),
  contentRating: movieContentRatingShema.required(),
  source: movieSourceSchema.required(),
  tags: movieTagsSchema,
});

const updateMovieSchema = joi.object({
  title: movieTitleSchema,
  year: movieYearSchema,
  cover: movieCoverSchema,
  description: movieDescriptionSchema,
  duration: movieDurationShema,
  contentRating: movieContentRatingShema,
  source: movieSourceSchema,
  tags: movieTagsSchema,
});

module.exports = {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
};

