import type { RequestHandler } from 'express'

import type {
  TAddMovieBodyDto,
  TMovieResponseDto,
  TMoviesResponseDto,
} from '@app/dtos/MovieDto.js'
import type { TRequestUser } from '@app/dtos/UserDto.js'
import type {
  API_ROUTES,
  FULL_API_ROUTES,
} from '@infrastructure/config/routes.js'

export type TMoviesFullRoutesValues =
  (typeof FULL_API_ROUTES)['movies'][keyof (typeof FULL_API_ROUTES)['movies']]

type TGetMoviesParams = Record<string, never>
type TAddMovieParams = TGetMoviesParams

type TGetMoviesBody = TGetMoviesParams
export type TGetMoviesHandler = RequestHandler<
  TGetMoviesParams,
  TMoviesResponseDto,
  TGetMoviesBody,
  TRequestUser
>

export type TAddMovieHandler = RequestHandler<
  TAddMovieParams,
  TMovieResponseDto,
  TAddMovieBodyDto,
  TRequestUser
>

type TUMoviesRoutes = keyof typeof API_ROUTES.movies
export type TMovieValidations = Record<TUMoviesRoutes, RequestHandler>
