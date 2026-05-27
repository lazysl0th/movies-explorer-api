import 'dotenv/config'

const {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  MONGODB_URI,
  FRONTEND_URL,
  BACKEND_URL,
  SALT_ROUNDS,
  SHUTDOWN_SERVER_TIMEOUT,
} = process.env

const isProd = NODE_ENV === 'production'

const config = {
  PORT: isProd && PORT ? Number(PORT) : 3001,
  JWT_SECRET: isProd && JWT_SECRET ? JWT_SECRET : 'JWT_SECRET_DEV',
  SALT_ROUNDS: isProd && SALT_ROUNDS ? Number(SALT_ROUNDS) : 10,
  MONGODB_URI:
    isProd && MONGODB_URI ? MONGODB_URI : 'mongodb://localhost:27017/moviesdb',
  FRONTEND_URL: isProd && FRONTEND_URL ? FRONTEND_URL : 'http://localhost:3000',
  BACKEND_URL: isProd && BACKEND_URL ? BACKEND_URL : 'http://localhost:3001',
  SHUTDOWN_SERVER_TIMEOUT:
    isProd && SHUTDOWN_SERVER_TIMEOUT ? SHUTDOWN_SERVER_TIMEOUT : 10000,
}

export default config
