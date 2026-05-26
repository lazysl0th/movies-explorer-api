import { Router } from 'express'

import {
  getUserProfile,
  updateUserProfile,
} from '../controllers/user.controller.js'
import { updateUserProfileValidation } from '../middleware/validation.js'

const router = Router()

router.get('/me', getUserProfile)

router.patch('/me', updateUserProfileValidation, updateUserProfile)

export default router
