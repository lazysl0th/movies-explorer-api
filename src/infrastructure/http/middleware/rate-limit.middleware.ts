import rateLimit from 'express-rate-limit'

import limiterOptions from '@infrastructure/config/limiter.config.js'

export default rateLimit(limiterOptions)
