import http from 'node:http'

import { createTerminus } from '@godaddy/terminus'

import getTerminusOptions from '@infrastructure/config/terminus.config.js'
import Database from '@infrastructure/database/database.module.js'
import Mongoose from '@infrastructure/database/mongoose.service.js'

import config from './infrastructure/config/env.js'
import AuthRouter from './infrastructure/http/routes/authRoutes.js'
import AppRouter from './infrastructure/http/routes/indexRoutes.js'
import App from './infrastructure/http/server.js'
import {
  handleCriticalError,
  handleListenServer,
  handleServerError,
} from './infrastructure/utils/utils.js'

function bootstrap() {
  const authRouter = new AuthRouter()
  const appRouter = new AppRouter(authRouter)
  const mongoose = new Mongoose(config.MONGODB_URI)
  const dbModule = new Database(mongoose)

  const app = new App(appRouter, dbModule)

  app.start()

  const server = http.createServer(app.express)

  createTerminus(server, getTerminusOptions(app))

  server.on('error', (err) => handleServerError(err, server))

  server.listen(config.PORT, handleListenServer)

  process.on('uncaughtException', handleCriticalError)
}

bootstrap()
