import cors from 'cors'

import config from './env.js'

import type { CorsOptions } from 'cors'

const allowedOrigins = [config.FRONTEND_URL]

const customOrigin: CorsOptions['origin'] = (origin, callback) => {
  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true)
    return
  }
  callback(null, false)
}

const corsOptions: CorsOptions = {
  origin: customOrigin,
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
}

export default cors(corsOptions)
