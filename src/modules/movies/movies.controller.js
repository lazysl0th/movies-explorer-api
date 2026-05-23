import Movie from './movie.model.js'
import response from '../../shared/constants/response.js'
import BadRequestError from '../../shared/errors/badRequest.js'

const { CREATED, BAD_REQUEST, OK } = response

export const addMovie = (req, res, next) => {
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

export const deleteMovieByCredentials = (req, res, next) => {
  Movie.deleteMovieByCredentials(req.params.movieId, req.user._id)
    .then((movie) => res.status(OK.statusCode).send(movie))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError(BAD_REQUEST.text))
      }
      return next(err)
    })
}
export const getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => res.status(OK.statusCode).send(movies))
    .catch(next)
}
