const Movie = require('./movie.model')
const { BAD_REQUEST, CREATED, OK } = require('../../shared/constants/response')
const BadRequestError = require('../../shared/errors/badRequest')

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
  } = req.body

  const owner = req.user._id

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
      res.status(CREATED.statusCode).send(movie)
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError(BAD_REQUEST.text))
      }
      return next(err)
    })
}

module.exports.deleteMovieByCredentials = (req, res, next) => {
  Movie.deleteMovieByCredentials(req.params.movieId, req.user._id)
    .then((movie) => res.status(OK.statusCode).send(movie))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError(BAD_REQUEST.text))
      }
      return next(err)
    })
}
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => res.status(OK.statusCode).send(movies))
    .catch(next)
}
