import { HealthCheckError } from '@godaddy/terminus'

import config from './env.js'
import APP_LOGS from '../constants/app-logs.constants.js'

import type { TerminusOptions } from '@godaddy/terminus'
import type { TTerminusApp } from '@app/interfaces/base/app.js'


const onSignalHandler = async (app: TTerminusApp): Promise<void> => {
  console.info(APP_LOGS.CLEANUP_START)
  try {
    await app.stop()
    console.info(APP_LOGS.CLEANUP_SUCCESS)
  } catch (cleanupError) {
    console.error({ cleanupError }, APP_LOGS.CLEANUP_ERROR)
    throw cleanupError
  }
}

const onShutdownHandler = async () => {
  console.info(APP_LOGS.PROCESS_EXITED_CLEANLY)
}

const onHealthCheckHandler = async (app: TTerminusApp) => {
  if (!app.healthCheck()) {
    throw new HealthCheckError(APP_LOGS.LIVENESS_FAILED, {
      reason: APP_LOGS.APP_UNAVAILABLE,
    })
  }
}

/* const onReadyCheckHandler = async (app: IApp) => {
    const status = await app.readyCheck(); 
    if (!status.db || !status.redis) {
        throw new HealthCheckError(APP_LOGS.LIVENESS_FAILED, {
            database: status.db ? 'OK' : 'DOWN',
            redis: status.redis ? 'OK' : 'DOWN',
            version: '1.0.0'
        });
    }
} */

const getTerminusOptions = (app: TTerminusApp): TerminusOptions => ({
  healthChecks: {
    '/healthz': async () => onHealthCheckHandler(app),
    // '/readyz': async () => onReadyCheckHandler(app)
  },
  timeout: Number(config.SHUTDOWN_SERVER_TIMEOUT),
  signals: ['SIGINT', 'SIGTERM'],
  logger: (msg, err) => console.error({ err }, msg),
  onSignal: async () => onSignalHandler(app),
  onShutdown: onShutdownHandler,
})

export default getTerminusOptions
