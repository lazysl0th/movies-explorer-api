import http from 'node:http'

import { createTerminus } from '@godaddy/terminus'

import Database from '@infrastructure/database/database.module.js'
import Mongoose from '@infrastructure/database/mongoose.service.js'

import App from './app/app.js'
import getTerminusOptions from './app/config/terminus.config.js'
import AppRouter from './app/router.js'
import {
  handleCriticalError,
  handleListenServer,
  handleServerError,
} from './app/utils.js'
import config from './shared/config/env.js'

function bootstrap() {
  const appRouter = new AppRouter()
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
