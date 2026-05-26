import { Router } from 'express'

import { createUser, login, logout } from '../controllers/user.controller.js'
import {
  signinValidation,
  signupValidationd,
} from '../middleware/validation.js'

import type { RequestHandler } from 'express'

import type { IRouter } from '@app/interfaces/base/router.base.js'

export default class AuthRouter implements IRouter {
  private readonly router: Router

  constructor() {
    this.router = Router()
    this.initializeRoutes()
  }

  private initializeRoutes(): void {
    this.router.post('/signin', signinValidation, login)
    this.router.post('/signup', signupValidationd, createUser)
    this.router.get('/signout', logout)
  }

  get requestHandler(): RequestHandler {
    return this.router
  }
}
