const router = require('express').Router()

const { getUserProfile, updateUserProfile } = require('./users.controller')
const {
  updateUserProfileValidation,
} = require('../../shared/middlewares/validation')

router.get('/me', getUserProfile)

router.patch('/me', updateUserProfileValidation, updateUserProfile)

module.exports = router
