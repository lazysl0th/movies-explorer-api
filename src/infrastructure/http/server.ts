import { errors } from 'celebrate'
import cookieParser from 'cookie-parser'
import express from 'express'
import helmet from 'helmet'

import rateLimitMiddleware from '@infrastructure/http/middleware/rate-limit.middleware.js'

import cors from './middleware/cors.middleware.js'
import errorsHandler from './middleware/errors/errorsHandler.js'
import { errorLogger, requestLogger } from './middleware/logger.middleware.js'

import type { Express } from 'express'

import type { IDBModule } from '@app/interfaces/services/IDBService.js'

import type { IApp } from '../../app/interfaces/base/app.js'
import type { IRouter } from '../../app/interfaces/base/router.base.js'

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
    this.express.use(rateLimitMiddleware)
    this.express.use(cookieParser())
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: true }))
    this.express.use(requestLogger)
    this.express.use(this.appRouter.requestHandler)
    this.express.use(errorLogger)
    this.express.use(errors())
    this.express.use(errorsHandler)
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
