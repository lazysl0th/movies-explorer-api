import { cookieTokenSchema } from '@app/dtos/AuthDto.js'
import { moviesResponseSchema } from '@app/dtos/MovieDto.js'
import { FULL_API_ROUTES } from '@infrastructure/config/routes.js'
import HttpStatusCode from '@infrastructure/constants/https-status-code.js'

import type { ZodOpenApiPathItemObject } from 'zod-openapi'

import type { TMoviesFullRoutesValues } from './types.js'

const movieRoutesJson: Record<
  TMoviesFullRoutesValues,
  ZodOpenApiPathItemObject
> = {
  [FULL_API_ROUTES.movies['/']]: {
    get: {
      tags: ['Movies'],
      summary: 'Get Movies',
      description: 'Retrieves a list of saved movies. Requires authentication.',
      requestParams: {
        cookie: cookieTokenSchema,
      },
      security: [{ cookieAuth: [] }],
      responses: {
        [HttpStatusCode.Ok]: {
          content: {
            'application/json': { schema: moviesResponseSchema },
          },
          description: 'Successfully retrieved the list of movies.',
        },
        [HttpStatusCode.Unauthorized]: {
          description: 'Unauthorized. Missing or invalid authentication token.',
        },
      },
    },
  },
}

export default movieRoutesJson
