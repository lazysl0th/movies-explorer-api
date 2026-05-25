import { errors } from 'celebrate'
import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'

import cors from './middlewares/cors.middleware.js'
import errorHandler from './middlewares/error-handler.middleware.js'
import { errorLogger, requestLogger } from './middlewares/logger.middleware.js'
import config from '../shared/config/env.js'
import rateLimit from '../shared/middlewares/rate-limit.middleware.js'

import type { Express } from 'express'

import type { IDBModule } from '@shared/base/db.base.js'

import type { IApp } from '../shared/base/app.base.js'
import type { IRouter } from '../shared/base/router.base.js'

const { MONGODB_URI } = config

export default class App implements IApp {
  public readonly express: Express

  private isAvailable = false

  constructor(
    private readonly appRouter: IRouter,
    private readonly dbModule: IDBModule,
  ) {
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
    this.express.use(errorHandler)
  }

  async start(): Promise<void> {
    try {
      this.initMiddlewares()
      await this.dbModule.connects()
      this.isAvailable = true
    } catch (err) {
      console.error('Failed to start the application:', err)
    }
  }

  async stop(): Promise<void> {
    this.isAvailable = false
    try {
      await this.dbModule.disconnects()
      console.log('Application stopped safely')
    } catch (err) {
      console.error('Error during stop:', err)
    }
  }

  healthCheck(): boolean {
    return this.isAvailable
  }
}
