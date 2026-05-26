import cors from 'cors'

import corsOptions from '@infrastructure/config/cors.config.js'

export default cors(corsOptions)
