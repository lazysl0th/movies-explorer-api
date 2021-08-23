const router = require('express').Router();
const { addMovieValidation, deleteMovieValidation } = require('../middlewares/validation');
const { getMovies, addMovie, deleteMovieByCredentials } = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', addMovieValidation, addMovie);

router.delete('/:movieId', deleteMovieValidation, deleteMovieByCredentials);

module.exports = router;
