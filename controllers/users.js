const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/user');
const NotFoundError = require('../errors/notFound');
const BadRequestError = require('../errors/badRequest');
const Conflict = require('../errors/conflict');
const {
  CREATED,
  OK,
  NOT_FOUND,
  BAD_REQUEST,
  CONFLICT,
} = require('../constant');

module.exports.getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND.text);
      }
      return res.status(OK.statusCode).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError(BAD_REQUEST.text));
      }
      return next(err);
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name },
    { new: true, runValidators: true },
  )
    .then((user) => res.status(OK.statusCode).send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new BadRequestError(BAD_REQUEST.text));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then(({
      _id, name,
    }) => {
      const token = jwt.sign({ _id }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(OK.statusCode).cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      }).send({ _id, email, name });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    })
      .then(({ _id, name, email }) => {
        res.status(CREATED.statusCode).send({ _id, name, email });
      })
      .catch((err) => {
        if (err.name === 'CastError' || err.name === 'ValidationError') {
          return next(new BadRequestError(BAD_REQUEST.text));
        }
        if (err.name === 'MongoError' && err.code === 11000) {
          return next(new Conflict(CONFLICT.text));
        }
        return next(err);
      }));
};

module.exports.logout = (req, res) => res.status(OK.statusCode).clearCookie('token').send({});
