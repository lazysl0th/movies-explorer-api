const router = require('express').Router()

const { getUserProfile, updateUserProfile } = require('../controllers/users')
const { updateUserProfileValidation } = require('../middlewares/validation')

router.get('/me', getUserProfile)

router.patch('/me', updateUserProfileValidation, updateUserProfile)

module.exports = router
