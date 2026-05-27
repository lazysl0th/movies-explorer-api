import { Router } from 'express'

import { AUTH_ROUTES } from '@infrastructure/config/routes.js'

import { createUser, logout } from '../../controllers/user.controller.js'
import { signupValidationd } from '../../middleware/validation.js'

import type AuthController from './AuthController.js'
import type { TAuthValidations } from './types.js'

const createAuthRoutes = (
  authValidation: TAuthValidations,
  authController: AuthController,
): Router => {
  const router = Router()
  router.post(
    AUTH_ROUTES.signin,
    authValidation.signin,
    authController.loginByEmail,
  )
  router.post('/signup', signupValidationd, createUser)
  router.get('signout', logout)
  return router
}

export default createAuthRoutes
