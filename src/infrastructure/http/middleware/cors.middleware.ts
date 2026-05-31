import cors from 'cors'

import corsOptions from '@infrastructure/config/cors.config.js'

const corsMiddleware = cors(corsOptions)

export default corsMiddleware
