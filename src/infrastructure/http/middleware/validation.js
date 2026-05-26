import { celebrate, Joi } from 'celebrate'
import validator from 'validator'

import response from '../../constants/response.js'

const { BAD_REQUEST } = response

const validationUrl = (value) => {
  if (validator.isURL(value)) {
    return value
  }
  return BAD_REQUEST.text
}

export const addMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required().positive(),
    year: Joi.number().required().positive(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validationUrl),
    trailer: Joi.string().required().custom(validationUrl),
    thumbnail: Joi.string().required().custom(validationUrl),
    movieId: Joi.number().required().integer(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
})

export const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
})

export const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
})

export const signupValidationd = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
})

export const updateUserProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
})
