const express = require('express')
const app = express()
const moviesApi = require('./routes/movies')
const userMoviesApi = require('./routes/userMovies')

const config = require('./config/index')
const { logErrors, errorHandler, wrapError } = require('./utils/middleware/errorHandlers')
const notFoundHandler = require('./utils/middleware/404Handler')

app.use(express.json())

// routes 
moviesApi(app)
userMoviesApi(app)
// 404 Catch
app.use(notFoundHandler)

// Error middleware
app.use(logErrors)
app.use(wrapError)
app.use(errorHandler)

app.listen(config.port, () => {
  console.log(`Escuchando en el puerto ${config.port}`)
})