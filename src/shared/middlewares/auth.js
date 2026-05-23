const jwt = require('jsonwebtoken')

const { JWT_SECRET } = require('../config/env')
const { FORBIDDEN } = require('../constants/response')
const Forbidden = require('../errors/forbidden')

module.exports = (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    throw new Forbidden(FORBIDDEN.text)
  }

  let payload

  try {
    payload = jwt.verify(token, JWT_SECRET)
  } catch (err) {
    throw new Forbidden(FORBIDDEN.text)
  }

  req.user = payload
  return next()
}
