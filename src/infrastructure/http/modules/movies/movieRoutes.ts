import { Router } from 'express'

import {
  addMovie,
  deleteMovieByCredentials,
  getMovies,
} from './movies.controller.js'
import {
  addMovieValidation,
  deleteMovieValidation,
} from '../../middleware/validation.js'

import type MovieController from './MovieController.js'
import type { TMovieValidations } from './types.js'

const createMovieRoutes = (
  movieValidation: TMovieValidations,
  movieController: MovieController,
): Router => {
  const router = Router()

  router.get('/', movieController.getUserMovies)

  router.post('/', movieValidation['/'], movieController.saveMovie)

  router.delete('/:movieId', deleteMovieValidation, deleteMovieByCredentials)

  return router
}

export default createMovieRoutes
