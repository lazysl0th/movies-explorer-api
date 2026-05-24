import http from 'node:http'

import { createTerminus } from '@godaddy/terminus'

import App from './app/app.js'
import getTerminusOptions from './app/config/terminus.config.js'
import AppRouter from './app/router.js'
import {
  handleCriticalError,
  handleListenServer,
  handleServerError,
} from './app/utils.js'
import config from './shared/config/env.js'

const appRouter = new AppRouter()

const app = new App(appRouter)

app.start()

const server = http.createServer(app.express)

createTerminus(server, getTerminusOptions(app))

server.on('error', (err) => handleServerError(err, server))

server.listen(config.PORT, handleListenServer)

process.on('uncaughtException', handleCriticalError)
