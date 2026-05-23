import config from './env.js'
import Forbidden from '../errors/forbidden.js'

import type { CorsOptions } from 'cors'

const allowedOrigins = [config.FRONTEND_URL]

const customOrigin: CorsOptions['origin'] = (origin, callback) => {
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true)
    return
  }
  callback(new Forbidden())
}

const corsOptions: CorsOptions = {
  origin: customOrigin,
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
}

export default corsOptions
