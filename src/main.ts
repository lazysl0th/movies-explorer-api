import App from './app/app.js'
import AppRouter from './app/router.js'
import config from './shared/config/env.js'

const { PORT } = config

const appRouter = new AppRouter()

const app = new App(appRouter)

app.start(PORT)
