import { errors } from 'celebrate'
import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'

import cors from './middlewares/cors.middleware.js'
import config from '../shared/config/env.js'
import response from '../shared/constants/response.js'
import { errorLogger, requestLogger } from '../shared/middlewares/logger.js'
import rateLimit from '../shared/middlewares/rate-limit.middleware.js'

import type { Express } from 'express'

import type { IApp } from '../shared/base/app.base.js'
import type { IRouter } from '../shared/base/router.base.js'

const { MONGODB_URI } = config
const { INTERNAL_SERVER_ERROR } = response

export default class App implements IApp {
  public readonly express: Express

  private isAvailable = false

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

  async start(): Promise<void> {
    try {
      await mongoose.connect(MONGODB_URI)
      this.initMiddlewares()
      this.isAvailable = true
    } catch (err) {
      console.error('Failed to start the application:', err)
    }
  }

  async stop(): Promise<void> {
    this.isAvailable = false
    try {
      await mongoose.disconnect()
      console.log('Application stopped safely')
    } catch (err) {
      console.error('Error during stop:', err)
    }
  }

  healthCheck(): boolean {
    return this.isAvailable
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
