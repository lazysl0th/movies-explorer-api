const { celebrate, Joi } = require('celebrate');

module.exports.signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.signupValidationd = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.updateUserProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports.addMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().alphanum(),
    director: Joi.string().required().alphanum(),
    duretion: Joi.number().required().positive(),
    year: Joi.number().required().positive(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    trailer: Joi.string().required(),
    thumbnail: Joi.string().required(),
    movieId: Joi.string().alphanum().length(24),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieValidation = celebrate({
  body: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }),
});
