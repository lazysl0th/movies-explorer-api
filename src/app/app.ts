import { errors } from 'celebrate'
import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'

import AppRouter from './router.js'
import config from '../shared/config/env.js'
import response from '../shared/constants/response.js'
import cors from '../shared/middlewares/cors.js'
import { errorLogger, requestLogger } from '../shared/middlewares/logger.js'
import rateLimit from '../shared/middlewares/rateLimit.js'

const { MONGODB_URI } = config
const { INTERNAL_SERVER_ERROR } = response

const createApp = (): any => {
  const app = express()

  app.use(helmet())

  app.use(cors)

  app.use(rateLimit)

  app.use(cookieParser())

  mongoose.connect(MONGODB_URI)

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(requestLogger)

  const appRouter = new AppRouter()
  app.use(appRouter.requestHandler)

  app.use(errorLogger)

  app.use(errors())

  app.use((err: any, req: any, res: any, next: any) => {
    console.log(err)
    const { statusCode = INTERNAL_SERVER_ERROR.statusCode, message } = err

    res.status(statusCode).send({
      message:
        statusCode === INTERNAL_SERVER_ERROR.statusCode
          ? INTERNAL_SERVER_ERROR.text
          : message,
    })
    next()
  })

  return app
}

export default createApp
