import { cookieTokenSchema } from '@app/dtos/AuthDto.js'
import {
  addMovieSchema,
  deleteMovieSchema,
  movieResponseSchema,
  moviesResponseSchema,
} from '@app/dtos/MovieDto.js'
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
    post: {
      tags: ['Movies'],
      summary: 'Add Movie',
      description:
        'Adds a new movie to the saved list. Requires authentication.',
      requestParams: {
        cookie: cookieTokenSchema,
      },
      requestBody: {
        content: {
          'application/json': { schema: addMovieSchema }, // Схема валидации входящих данных фильма
        },
      },
      security: [{ cookieAuth: [] }],
      responses: {
        [HttpStatusCode.Created]: {
          content: {
            'application/json': { schema: movieResponseSchema },
          },
          description: 'Movie successfully added.',
        },
        [HttpStatusCode.BadRequest]: {
          description: 'Bad Request. Invalid input data.',
        },
        [HttpStatusCode.Unauthorized]: {
          description: 'Unauthorized. Missing or invalid authentication token.',
        },
      },
    },
    delete: {
      tags: ['Movies'],
      summary: 'Delete Movie',
      description:
        'Deletes a specific movie from the saved list by its ID. Requires authentication.',
      requestParams: {
        cookie: cookieTokenSchema,
        path: deleteMovieSchema,
      },
      security: [{ cookieAuth: [] }],
      responses: {
        [HttpStatusCode.Ok]: {
          description: 'Movie successfully deleted.',
        },
        [HttpStatusCode.BadRequest]: {
          description: 'Bad Request. Invalid movie ID supplied.',
        },
        [HttpStatusCode.Unauthorized]: {
          description: 'Unauthorized. Missing or invalid authentication token.',
        },
        [HttpStatusCode.NotFound]: {
          description: 'Movie not found.',
        },
      },
    },
  },
  [FULL_API_ROUTES.movies['/:movieId']]: {},
}

export default movieRoutesJson
