import { Router } from 'express'

import moviesRoutes from '../modules/movies/movies.routes.js'
import { createUser, login, logout } from '../modules/user/users.controller.js'
import usersRoutes from '../modules/user/users.routes.js'
import response from '../shared/constants/response.js'
import NotFoundError from '../shared/errors/notFound.js'
import auth from '../shared/middlewares/auth.js'
import {
  signinValidation,
  signupValidationd,
} from '../shared/middlewares/validation.js'

const router = Router()
const { NOT_FOUND } = response

router.post('/signin', signinValidation, login)

router.post('/signup', signupValidationd, createUser)

router.get('/signout', logout)

router.use(auth)

router.use('/users', usersRoutes)
router.use('/movies', moviesRoutes)

router.use((req, res, next) => {
  next(new NotFoundError(NOT_FOUND.text))
})

export default router
