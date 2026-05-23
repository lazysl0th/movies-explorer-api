import { Router } from 'express'

import moviesRoutes from '../modules/movies/movies.routes.js'
import { createUser, login, logout } from '../modules/user/users.controller.js'
import usersRoutes from '../modules/user/users.routes.js'
import NotFoundError from '../shared/errors/notFound.js'
import auth from '../shared/middlewares/auth.js'
import {
  signinValidation,
  signupValidationd,
} from '../shared/middlewares/validation.js'

import type { RequestHandler } from 'express'

import type { IRouter } from '../shared/base/router.js'

export default class AppRouter implements IRouter {
  private readonly router: Router

  constructor(
    private readonly authRouter?: IRouter,
    private readonly usersRouter?: IRouter,
    private readonly moviesRouter?: IRouter,
  ) {
    this.router = Router()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.post('/signin', signinValidation, login)
    this.router.post('/signup', signupValidationd, createUser)
    this.router.get('/signout', logout)
    this.router.use(auth)
    this.router.use('/users', usersRoutes)
    this.router.use('/movies', moviesRoutes)
    this.router.use((_, __, next) => next(new NotFoundError()))
  }

  get requestHandler(): RequestHandler {
    return this.router
  }
}
