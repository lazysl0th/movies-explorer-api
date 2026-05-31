import http from 'node:http'

import { createTerminus } from '@godaddy/terminus'

import createApp from '@infrastructure/config/container.config.js'
import getTerminusOptions from '@infrastructure/config/terminus.config.js'

import config from './infrastructure/config/env.config.js'
import {
  handlerCriticalError,
  handlerListenServer,
  handlerServerError,
} from './infrastructure/utils/utils.js'

function bootstrap() {
  const app = createApp()

  app.start()

  const server = http.createServer(app.express)

  createTerminus(server, getTerminusOptions(app))

  server.on('error', (err) => handlerServerError(err, server))

  server.listen(config.PORT, handlerListenServer)

  process.on('uncaughtException', handlerCriticalError)
}

bootstrap()
