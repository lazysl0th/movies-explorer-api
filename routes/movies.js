const router = require('express').Router()

const {
  addMovie,
  deleteMovieByCredentials,
  getMovies,
} = require('../controllers/movies')
const {
  addMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validation')

router.get('/', getMovies)

router.post('/', addMovieValidation, addMovie)

router.delete('/:movieId', deleteMovieValidation, deleteMovieByCredentials)

module.exports = router
