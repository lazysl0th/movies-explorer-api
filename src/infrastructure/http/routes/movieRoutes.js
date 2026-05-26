import { Router } from 'express'

import {
  addMovie,
  deleteMovieByCredentials,
  getMovies,
} from '../controllers/movie.controller.js'
import {
  addMovieValidation,
  deleteMovieValidation,
} from '../middleware/validation.js'

const router = Router()

router.get('/', getMovies)

router.post('/', addMovieValidation, addMovie)

router.delete('/:movieId', deleteMovieValidation, deleteMovieByCredentials)

export default router
