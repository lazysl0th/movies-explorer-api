import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3001),
  JWT_SECRET: z.string().min(1).default('JWT_SECRET_DEV'),
  SALT_ROUNDS: z.coerce.number().default(10),
  MONGODB_URI: z.url().default('mongodb://localhost:27017/moviesdb'),
  FRONTEND_URL: z.url().default('http://localhost:3000'),
  BACKEND_URL: z.url().default('http://localhost:3001'),
  SHUTDOWN_SERVER_TIMEOUT: z.coerce.number().default(10000),
})

const env = envSchema.parse(process.env)

const config = {
  PORT: env.PORT,
  JWT_SECRET: env.JWT_SECRET,
  SALT_ROUNDS: env.SALT_ROUNDS,
  MONGODB_URI: env.MONGODB_URI,
  FRONTEND_URL: env.FRONTEND_URL,
  BACKEND_URL: env.BACKEND_URL,
  SHUTDOWN_SERVER_TIMEOUT: env.SHUTDOWN_SERVER_TIMEOUT,
  isProd: env.NODE_ENV === 'production',
} as const

export default config
