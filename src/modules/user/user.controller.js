import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from './user.model.js'
import config from '../../shared/config/env.js'
import response from '../../shared/constants/response.js'
import BadRequestError from '../../shared/errors/badRequest.js'
import Conflict from '../../shared/errors/conflict.js'
import NotFoundError from '../../shared/errors/notFound.js'

const { JWT_SECRET } = config
const { BAD_REQUEST, CONFLICT, CREATED, NOT_FOUND, OK } = response

export const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) =>
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    })
      .then(({ _id, name, email }) => {
        res.status(CREATED.statusCode).send({ _id, name, email })
      })
      .catch((err) => {
        if (err.name === 'CastError' || err.name === 'ValidationError') {
          return next(new BadRequestError(BAD_REQUEST.text))
        }
        if (err.name === 'MongoError' && err.code === 11000) {
          return next(new Conflict(CONFLICT.text))
        }
        return next(err)
      }),
  )
}
export const getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND.text)
      }
      return res.status(OK.statusCode).send(user)
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError(BAD_REQUEST.text))
      }
      return next(err)
    })
}

export const login = (req, res, next) => {
  const { email, password } = req.body

  return User.findUserByCredentials(email, password)
    .then(({ _id, name }) => {
      const token = jwt.sign({ _id }, JWT_SECRET, { expiresIn: '7d' })
      return res
        .status(OK.statusCode)
        .cookie('token', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        })
        .send({ _id, email, name })
    })
    .catch(next)
}

export const logout = (req, res) =>
  res.status(OK.statusCode).clearCookie('token').send({})
export const updateUserProfile = (req, res, next) => {
  const { name, email } = req.body

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(OK.statusCode).send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError(BAD_REQUEST.text))
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new Conflict(CONFLICT.text))
      }
      return next(err)
    })
}
