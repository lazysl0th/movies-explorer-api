const router = require('express').Router()

const moviesRoutes = require('./movies')
const usersRoutes = require('./users')
const { NOT_FOUND } = require('../constant')
const { createUser, login, logout } = require('../controllers/users')
const NotFoundError = require('../errors/notFound')
const auth = require('../middlewares/auth')
const {
  signinValidation,
  signupValidationd,
} = require('../middlewares/validation')

router.post('/signin', signinValidation, login)

router.post('/signup', signupValidationd, createUser)

router.get('/signout', logout)

router.use(auth)

router.use('/users', usersRoutes)
router.use('/movies', moviesRoutes)

router.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND.text))
})

module.exports = router
