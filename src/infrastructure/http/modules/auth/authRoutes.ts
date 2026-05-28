import { Router } from 'express'

import { API_ROUTES } from '@infrastructure/config/routes.js'

import type AuthController from './AuthController.js'
import type { TAuthValidations } from './types.js'

const createAuthRoutes = (
  authValidation: TAuthValidations,
  authController: AuthController,
): Router => {
  const router = Router()
  router.post(
    API_ROUTES.auth.signin,
    authValidation.signin,
    authController.loginByEmail,
  )
  router.post(
    API_ROUTES.auth.signup,
    authValidation.signup,
    authController.registerUser,
  )
  router.get(API_ROUTES.auth.signup, authController.logout)
  return router
}

export default createAuthRoutes
