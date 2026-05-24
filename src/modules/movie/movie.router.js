import { Router } from 'express'

import {
  addMovie,
  deleteMovieByCredentials,
  getMovies,
} from './movie.controller.js'
import {
  addMovieValidation,
  deleteMovieValidation,
} from '../../shared/middlewares/validation.js'

const router = Router()

router.get('/', getMovies)

router.post('/', addMovieValidation, addMovie)

router.delete('/:movieId', deleteMovieValidation, deleteMovieByCredentials)

export default router
