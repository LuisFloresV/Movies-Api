const express = require('express')
const moviesService = require('../services/movies')

function moviesApi(app) {
  const router = express.Router()
  app.use('/api/movies', router)

  const MoviesService = new moviesService()

  router.get('/', async function (req, res, next) {
    const { tags } = req.query
    try {
      const movies = await MoviesService.getMovies({ tags })
      res.status(200).json({
        data: movies,
        message: 'movies listed'
      })
    } catch (error) {
      next(error)
    }
  })

  router.get('/:movieId', async function (req, res, next) {
    try {
      const movie = await MoviesService.getMovie(req.params.movieId)
      res.status(200).json({
        data: movie === null ? "No movie!" : movie,
        message: 'Movie retrieved'
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/', async function (req, res, next) {
    try {
      const createdMovieId = await MoviesService.createMovie(req.body)
      res.status(201).json({
        data: createdMovieId,
        message: 'Movie created!'
      })
    } catch (error) {
      next(error)
    }
  })

  router.patch('/:movieId', async function (req, res, next) {
    try {
      const updatedMovieId = await MoviesService.updateMovie(req.params.movieId, req.body)
      res.status(200).json({
        data: updatedMovieId,
        message: updatedMovieId === false ? "Movie not updated" : "Movie updated"
      })
    } catch (error) {
      next(error)
    }
  })

  router.delete('/:movieId', async function (req, res, next) {
    try {
      const deletedMovieId = await MoviesService.deleteMovie(req.params.movieId)
      res.status(200).json({
        data: deletedMovieId,
        message: deletedMovieId  === false ? "Movie already deleted or doesnt exist!" : "Movie deleted!"
      })
    } catch (error) {
      next(error)
    }
  })
}

module.exports = moviesApi 