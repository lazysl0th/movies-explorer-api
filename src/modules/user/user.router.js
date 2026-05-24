import { Router } from 'express'

import { getUserProfile, updateUserProfile } from './user.controller.js'
import { updateUserProfileValidation } from '../../shared/middlewares/validation.js'

const router = Router()

router.get('/me', getUserProfile)

router.patch('/me', updateUserProfileValidation, updateUserProfile)

export default router
