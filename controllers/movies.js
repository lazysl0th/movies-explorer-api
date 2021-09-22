const Movie = require('../models/movie');
const { CREATED, OK, BAD_REQUEST } = require('../constant');
const BadRequestError = require('../errors/badRequest');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('user')
    .then((movies) => res.status(OK.statusCode).send(movies))
    .catch(next);
};

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.status(CREATED.statusCode).send(movie);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError(BAD_REQUEST.text));
      }
      return next(err);
    });
};

module.exports.deleteMovieByCredentials = (req, res, next) => {
  Movie.deleteMovieByCredentials(req.params.movieId, req.user._id)
    .then((movie) => res.status(OK.statusCode).send(movie))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError(BAD_REQUEST.text));
      }
      return next(err);
    });
};
