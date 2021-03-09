const express = require('express')
const UserMoviesServices = require('../services/userMovies')
const { movieIdSchema } = require('../utils/schemas/movies')
const { userIdSchema } = require('../utils/schemas/users')
const { createUserMovieSchema } = require('../utils/schemas/userMovies')
const passport = require('passport')
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler')
const validationHandler = require('../utils/middleware/validationHandler')
const UsersMoviesService = require('../services/userMovies')
const { query } = require('express')

require('../utils/auth/strategies/jwt')

function userMoviesApi(app) {
  const router = express.Router()
  app.use('/api/user-movies', router)

  const userMoviesService = new UsersMoviesService()

  router.get('/', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['read:user-movies']), validationHandler({ userId: userIdSchema }, 'query'), async function (req, res, next) {
    const { userId } = req.query
    try {
      const userMovies = await userMoviesService.getUserMovies({ userId })
      res.status(200).json({
        data: userMovies,
        message: 'user movies listed'
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['create:user-movies']), validationHandler(createUserMovieSchema), async function (req, res, next) {
    try {
      const createdUserMovieId = await userMoviesService.createUserMovie(req.body)
      res.status(201).json({
        data: createdUserMovieId,
        message: 'User movie created!'
      })
    } catch (error) {
      next(error)
    }
  })

  router.delete('/:userMovieId', passport.authenticate('jwt', { session: false }), scopesValidationHandler(['delete:user-movies']), validationHandler({ userMovieId: movieIdSchema }, 'params'), async function (req, res, next) {
    try {
      const deletedUserMovieId = await userMoviesService.deleteUserMovie(req.params.userMovieId)
      res.status(200).json({
        data: deletedUserMovieId,
        message: deletedUserMovieId === false ? "User movie already deleted or doesnt exist!" : "Movie deleted!"
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = userMoviesApi