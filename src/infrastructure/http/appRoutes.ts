import { Router } from 'express'

import { cookieTokenSchema } from '@app/dtos/AuthDto.js'
import NotFoundError from '@domain/errors/NotFoundError.js'
import { BASE_ROUTES } from '@infrastructure/config/routes.js'

import { validateCookie } from './middleware/validation.middleware.js'

import type { RequestHandler } from 'express'

type TAppRoutes = Record<keyof typeof BASE_ROUTES, Router>

const createAppRoutes = (
  { auth, doc, users, movies }: TAppRoutes,
  authMiddleware: RequestHandler,
): Router => {
  const router = Router()
  router.use('/', auth)
  router.use(BASE_ROUTES.doc, doc)
  router.use(validateCookie(cookieTokenSchema), authMiddleware)
  router.use(BASE_ROUTES.users, users)
  router.use(BASE_ROUTES.movies, movies)
  router.use((_, __, next) => next(new NotFoundError('Route')))
  return router
}

export default createAppRoutes
