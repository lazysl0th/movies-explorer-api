import rateLimit from 'express-rate-limit'

import limiterOption from '../config/limiter.js'

export default rateLimit(limiterOption)
