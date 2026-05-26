import config from '../config/env.js'
import APP_LOGS from '../constants/app-logs.constants.js'

import type { Server } from 'node:http'

export const handleServerError = (
  error: NodeJS.ErrnoException,
  server: Server,
) => {
  if (error.code === 'EADDRINUSE') {
    console.error(
      { port: config.PORT, error },
      APP_LOGS.STARTUP_FAILED_PORT(config.PORT),
    )
  } else {
    console.error({ error }, APP_LOGS.CRITICAL_STARTUP_ERROR)
  }
  process.exitCode = 1
  server.close()
}

export const handleListenServer = () =>
  console.info(APP_LOGS.SERVER_RUNNING(config.PORT))

export const handleCriticalError = (err: Error) => {
  console.error({ err }, APP_LOGS.CRITICAL_ERROR_ENCOUNTERED)
  process.emit('SIGTERM')
}
