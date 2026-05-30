import { Router } from 'express'

import type { TUserValidations } from './types.js'
import type UserController from './UserController.js'

const createUserRoutes = (
  userController: UserController,
  userValidation: TUserValidations,
): Router => {
  const router = Router()

  router.get('/me', userController.getUserProfile)

  router.patch('/me', userValidation.me, userController.updateUserProfile)

  return router
}

export default createUserRoutes
