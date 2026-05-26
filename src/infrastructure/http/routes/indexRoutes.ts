import { Router } from 'express'

import NotFoundError from '@domain/errors/notFound.js'

import moviesRoutes from './movieRoutes.js'
import usersRoutes from './userRoutes.js'
import auth from '../middleware/auth.js'

import type { RequestHandler } from 'express'

import type { IRouter } from '../../../app/interfaces/base/router.base.js'

export default class AppRouter implements IRouter {
  private readonly router: Router

  constructor(
    private readonly authRouter: IRouter,
    private readonly usersRouter?: IRouter,
    private readonly moviesRouter?: IRouter,
  ) {
    this.router = Router()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.post('/auth', this.authRouter.requestHandler)
    this.router.use(auth)
    this.router.use('/users', usersRoutes)
    this.router.use('/movies', moviesRoutes)
    this.router.use((_, __, next) => next(new NotFoundError()))
  }

  get requestHandler(): RequestHandler {
    return this.router
  }
}
