import jwt from 'jsonwebtoken'

import Forbidden from '../../../domain/errors/forbidden.js'
import config from '../../config/env.js'
import response from '../../constants/response.js'

const { JWT_SECRET } = config
const { FORBIDDEN } = response

const auth = (req, _, next) => {
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

export default auth
