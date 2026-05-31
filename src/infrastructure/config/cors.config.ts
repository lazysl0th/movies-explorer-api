import ForbiddenError from '@domain/errors/ForbiddenError.js'

import config from './env.config.js'

import type { CorsOptions } from 'cors'

const allowedOrigins = [config.FRONTEND_URL]

const customOrigin: CorsOptions['origin'] = (origin, callback) => {
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true)
    return
  }
  callback(new ForbiddenError())
}

const corsOptions: CorsOptions = {
  origin: customOrigin,
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
}

export default corsOptions
