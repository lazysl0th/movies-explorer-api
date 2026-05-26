import 'dotenv/config'

const {
  NODE_ENV,
  PORT,
  JWT_SECRET,
  MONGODB_URI,
  FRONTEND_URL,
  SHUTDOWN_SERVER_TIMEOUT,
} = process.env

const config = {
  PORT: NODE_ENV === 'production' && PORT ? Number(PORT) : 3001,
  JWT_SECRET:
    NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : 'JWT_SECRET_DEV',
  MONGODB_URI:
    NODE_ENV === 'production' && MONGODB_URI
      ? MONGODB_URI
      : 'mongodb://localhost:27017/moviesdb',
  FRONTEND_URL:
    NODE_ENV === 'production' && FRONTEND_URL
      ? FRONTEND_URL
      : 'http://localhost:3000',
  SHUTDOWN_SERVER_TIMEOUT:
    NODE_ENV === 'production' && SHUTDOWN_SERVER_TIMEOUT
      ? SHUTDOWN_SERVER_TIMEOUT
      : 10000,
}

export default config
