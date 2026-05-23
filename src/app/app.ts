import { errors } from 'celebrate'
import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'

import config from '../shared/config/env.js'
import response from '../shared/constants/response.js'
import cors from '../shared/middlewares/cors.js'
import { errorLogger, requestLogger } from '../shared/middlewares/logger.js'
import rateLimit from '../shared/middlewares/rateLimit.js'

import type { Express } from 'express'

import type { IApp } from '../shared/base/app.js'
import type { IRouter } from '../shared/base/router.js'

const { MONGODB_URI } = config
const { INTERNAL_SERVER_ERROR } = response

export default class App implements IApp {
  private readonly express: Express

  constructor(private readonly appRouter: IRouter) {
    this.express = express()
  }

  private initMiddlewares() {
    this.express.use(helmet())
    this.express.use(cors)
    this.express.use(rateLimit)
    this.express.use(cookieParser())
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: true }))
    this.express.use(requestLogger)
    this.express.use(this.appRouter.requestHandler)
    this.express.use(errorLogger)
    this.express.use(errors())
    this.express.use(App.errorHandler)
  }

  async start(port: number | string): Promise<void> {
    try {
      await mongoose.connect(MONGODB_URI)
      this.initMiddlewares()
      this.express.listen(port)
    } catch (err) {
      console.error('Failed to start the application:', err)
    }
  }

  private static errorHandler(err: any, _: any, res: any, next: any) {
    console.log(err)
    const { statusCode = INTERNAL_SERVER_ERROR.statusCode, message } = err

    res.status(statusCode).send({
      message:
        statusCode === INTERNAL_SERVER_ERROR.statusCode
          ? INTERNAL_SERVER_ERROR.text
          : message,
    })
    next()
  }
}
