const router = require('express').Router()

const {
  addMovie,
  deleteMovieByCredentials,
  getMovies,
} = require('./movies.controller')
const {
  addMovieValidation,
  deleteMovieValidation,
} = require('../../shared/middlewares/validation')

router.get('/', getMovies)

router.post('/', addMovieValidation, addMovie)

router.delete('/:movieId', deleteMovieValidation, deleteMovieByCredentials)

module.exports = router
