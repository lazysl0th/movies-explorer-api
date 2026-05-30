import { Router } from 'express'

import NotFoundError from '@domain/errors/notFound.js'
import { BASE_ROUTES } from '@infrastructure/config/routes.js'

import authMiddleware from './middleware/auth.js'

type TAppRoutes = Record<keyof typeof BASE_ROUTES, Router>

const createAppRoutes = ({ auth, doc, users, movies }: TAppRoutes) => {
  const router = Router()
  router.use('/', auth)
  router.use(BASE_ROUTES.doc, doc)
  router.use(authMiddleware)
  router.use(BASE_ROUTES.users, users)
  router.use(BASE_ROUTES.movies, movies)
  router.use((_, __, next) => next(new NotFoundError()))
  return router
}

export default createAppRoutes
