import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import validator from 'validator'

import response from '../../shared/constants/response.js'
import Unauthorized from '../../shared/errors/unauthorized.js'

const { BAD_REQUEST, UNAUTHORIZED } = response

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value)
      },
      message: BAD_REQUEST.text,
    },
  },
  password: {
    type: String,
    require: true,
    select: false,
    validate: {
      validator(value) {
        return validator.isStrongPassword(value)
      },
      message: BAD_REQUEST.text,
    },
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true,
  },
})

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized(UNAUTHORIZED.text)
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new Unauthorized(UNAUTHORIZED.text)
        }
        return user
      })
    })
    .catch()
}

export default mongoose.model('user', userSchema)
