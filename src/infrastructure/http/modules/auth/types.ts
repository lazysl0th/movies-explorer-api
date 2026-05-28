import type { RequestHandler } from 'express'

import type {
  TAuthResponseDto,
  TLoginBodyDto,
  TRegisterBodyDto,
} from '@app/dtos/AuthDto.js'
import type {
  API_ROUTES,
  FULL_API_ROUTES,
} from '@infrastructure/config/routes.js'

export type TAuthFullRoutesValues =
  (typeof FULL_API_ROUTES)['auth'][keyof (typeof FULL_API_ROUTES)['auth']]

export type TAuthRoutes = keyof typeof API_ROUTES.auth

export type TAuthRoutess =
  (typeof API_ROUTES.auth)[keyof typeof API_ROUTES.auth]

export type TAuthValidations = Record<TAuthRoutes, RequestHandler>

type TAuthParams = Record<string, never>

export type TLoginHandler = RequestHandler<
  TAuthParams,
  TAuthResponseDto,
  TLoginBodyDto
>

export type TRegisterHandler = RequestHandler<
  TAuthParams,
  TAuthResponseDto,
  TRegisterBodyDto
>
