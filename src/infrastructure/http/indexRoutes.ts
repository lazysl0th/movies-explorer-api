import { Router } from 'express'

import NotFoundError from '@domain/errors/notFound.js'
import { BASE_ROUTES } from '@infrastructure/config/routes.js'

import auth from './middleware/auth.js'

import type { RequestHandler } from 'express'

import type { IRouter } from '../../app/interfaces/base/router.base.js'

export default class AppRouter implements IRouter {
  private readonly router: Router

  constructor(
    private readonly DocRoutes: Router,
    private readonly authRoutes: Router,
    private readonly usersRoutes: Router,
    private readonly moviesRouter: Router,
  ) {
    this.router = Router()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.use('/', this.authRoutes)
    this.router.use(BASE_ROUTES.doc, this.DocRoutes)
    this.router.use(auth)
    this.router.use(BASE_ROUTES.users, this.usersRoutes)
    this.router.use(BASE_ROUTES.movies, this.moviesRouter)
    this.router.use((_, __, next) => next(new NotFoundError()))
  }

  get requestHandler(): RequestHandler {
    return this.router
  }
}
