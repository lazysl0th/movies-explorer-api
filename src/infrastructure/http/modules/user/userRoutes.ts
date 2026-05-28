import { Router } from 'express'

import { updateUserProfile } from '../../controllers/user.controller.js'
import { updateUserProfileValidation } from '../../middleware/validation.js'

import type UserController from './UserController.js'

const createUserRoutes = (userController: UserController) => {
  const router = Router()

  router.get('/me', userController.getUserProfile)

  router.patch('/me', updateUserProfileValidation, updateUserProfile)

  return router
}

export default createUserRoutes
