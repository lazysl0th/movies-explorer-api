const router = require('express').Router()

const moviesRoutes = require('../modules/movies/movies.routes')
const {
  createUser,
  login,
  logout,
} = require('../modules/user/users.controller')
const usersRoutes = require('../modules/user/users.routes')
const { NOT_FOUND } = require('../shared/constants/response')
const NotFoundError = require('../shared/errors/notFound')
const auth = require('../shared/middlewares/auth')
const {
  signinValidation,
  signupValidationd,
} = require('../shared/middlewares/validation')

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
