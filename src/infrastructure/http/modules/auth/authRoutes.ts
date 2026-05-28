import { Router } from 'express'

import { AUTH_ROUTES } from '@infrastructure/config/routes.js'

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
  router.post(
    AUTH_ROUTES.signup,
    authValidation.signup,
    authController.registerUser,
  )
  router.get(AUTH_ROUTES.signup, authController.logout)
  return router
}

export default createAuthRoutes
