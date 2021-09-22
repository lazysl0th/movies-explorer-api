const mongoose = require('mongoose');
const validator = require('validator');
const NotFoundError = require('../errors/notFound');
const Forbidden = require('../errors/forbidden');
const { NOT_FOUND, FORBIDDEN, BAD_REQUEST } = require('../constant');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    require: true,
  },
  director: {
    type: String,
    require: true,
  },
  duration: {
    type: Number,
    require: true,
  },
  year: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: BAD_REQUEST.text,
    },
  },
  trailer: {
    type: String,
    require: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: BAD_REQUEST.text,
    },
  },
  thumbnail: {
    type: String,
    require: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: BAD_REQUEST.text,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true,
  },
  movieId: {
    type: Number,
    require: true,
  },
  nameRU: {
    type: String,
    require: true,
  },
  nameEN: {
    type: String,
    require: true,
  },
});

movieSchema.statics.deleteMovieByCredentials = function deleteMovieByCredentials(movieId, ownerId) {
  return this.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND.text);
      }
      if (String(movie.owner) !== ownerId) {
        throw new Forbidden(FORBIDDEN.text);
      }
      return this.deleteOne({ _id: movieId })
        .then(() => movie);
    });
};

module.exports = mongoose.model('movie', movieSchema);
