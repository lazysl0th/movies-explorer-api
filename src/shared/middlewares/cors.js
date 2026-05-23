import config from '../config/env.js'

const { FRONTEND_URL } = config

const allowedCors = [FRONTEND_URL]
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE'

const cors = (req, res, next) => {
  const { origin } = req.headers
  const requestHeaders = req.headers['access-control-request-headers']
  const { method } = req

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Credentials', true)
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS)
    res.header('Access-Control-Allow-Headers', requestHeaders)

    res.status(res.statusCode).send()
    return
  }

  next()
}

export default cors
