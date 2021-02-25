const { moviesMock } = require('../utils/mocks/movies')
const movieService = require('../lib/mongo')

class MoviesService {
  constructor() {
    this.collection = 'movies'
    this.db = new movieService()
  }
  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } }
    const movies = await this.db.getAll(this.collection, query)
    return movies || []
  }

  async getMovie(movieId) {
    const movie = await this.db.get(this.collection, movieId)
    return movie
  }

  async createMovie(data) {
    const createdMovieId = await this.db.create(this.collection, data)
    return createdMovieId
  }

  async updateMovie(id, data) {
    const updatedMovieId = await this.db.update(this.collection, id, data)
    return updatedMovieId
  }

  async deleteMovie(id) {
    const deletedMovieId = await this.db.delete(this.collection, id)
    return deletedMovieId
  }
}


module.exports = MoviesService