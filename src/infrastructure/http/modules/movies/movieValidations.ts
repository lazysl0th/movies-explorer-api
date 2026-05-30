import { addMovieBodySchema } from '@app/dtos/MovieDto.js'

import validateBody from '../../middleware/validation-zod.middleware.js'

import type { TMovieValidations } from './types.js'

const movieValidations: TMovieValidations = {
  '/': validateBody(addMovieBodySchema),
}

export default movieValidations
