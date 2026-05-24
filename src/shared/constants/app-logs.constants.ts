const STARTUP_FAILED_PORT = (port: number) =>
  `Server startup failed: Port ${port} is already in use by another process.`
const SERVER_RUNNING = (port: number) => `Server is running on port ${port}`
const CRITICAL_STARTUP_ERROR = 'Critical error during HTTP server startup'
const CLEANUP_START = 'Cleaning up internal resources...'
const CLEANUP_SUCCESS = 'Internal resources successfully cleaned up.'
const CLEANUP_ERROR = 'Error during resource cleanup'
const CRITICAL_ERROR_ENCOUNTERED =
  'Critical error encountered, initiating shutdown'
const PROCESS_EXITED_CLEANLY = 'Process exited cleanly.'
const APP_UNAVAILABLE = 'Application is unavailable'
const LIVENESS_FAILED = 'Liveness check failed'
const READINESS_FAILED = 'Readiness check failed'

const APP_LOGS = {
  STARTUP_FAILED_PORT,
  SERVER_RUNNING,
  CRITICAL_STARTUP_ERROR,
  CLEANUP_START,
  CLEANUP_SUCCESS,
  CLEANUP_ERROR,
  CRITICAL_ERROR_ENCOUNTERED,
  PROCESS_EXITED_CLEANLY,
  APP_UNAVAILABLE,
  LIVENESS_FAILED,
  READINESS_FAILED,
}

export default APP_LOGS
