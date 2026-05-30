import { addMovieBodySchema, deleteMovieSchema } from '@app/dtos/MovieDto.js'
import {
  validateBody,
  validateParams,
} from '@infrastructure/http/middleware/validation.middleware.js'

import type { TMovieValidations } from './types.js'

const movieValidations: TMovieValidations = {
  '/': validateBody(addMovieBodySchema),
  '/:movieId': validateParams(deleteMovieSchema),
}

export default movieValidations
