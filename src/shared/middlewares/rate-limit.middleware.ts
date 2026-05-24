import rateLimit from 'express-rate-limit'

import limiterOptions from '../config/limiter.config.js'

export default rateLimit(limiterOptions)
