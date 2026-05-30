import { Router } from 'express'

import type MovieController from './MovieController.js'
import type { TMovieValidations } from './types.js'

const createMovieRoutes = (
  movieValidation: TMovieValidations,
  movieController: MovieController,
): Router => {
  const router = Router()

  router.get('/', movieController.getUserMovies)

  router.post('/', movieValidation['/'], movieController.saveMovie)

  router.delete(
    '/:movieId',
    movieValidation['/:movieId'],
    movieController.deleteMovieByCredentials,
  )

  return router
}

export default createMovieRoutes
