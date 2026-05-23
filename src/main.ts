import createApp from './app/app.js'
import config from './shared/config/env.js'

const { PORT } = config

const app = createApp()
app.listen(PORT)
