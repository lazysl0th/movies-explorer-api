import type { RequestHandler } from 'express'

import type { TMoviesResponseDto } from '@app/dtos/MovieDto.js'
import type { TRequestUser } from '@app/dtos/UserDto.js'
import type { FULL_API_ROUTES } from '@infrastructure/config/routes.js'

export type TMoviesFullRoutesValues =
  (typeof FULL_API_ROUTES)['movies'][keyof (typeof FULL_API_ROUTES)['movies']]

type TGetMoviesParams = Record<string, never>

type TGetMoviesBody = TGetMoviesParams
export type TGetMoviesHandler = RequestHandler<
  TGetMoviesParams,
  TMoviesResponseDto,
  TGetMoviesBody,
  TRequestUser
>
