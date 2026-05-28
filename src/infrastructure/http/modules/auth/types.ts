import type { RequestHandler } from 'express'

import type {
  TAuthResponseDto,
  TLoginBodyDto,
  TRegisterBodyDto,
} from '@app/dtos/AuthDTO.js'
import type { API_ROUTES, AUTH_ROUTES } from '@infrastructure/config/routes.js'

export type TAuthFullRoutesValues =
  (typeof API_ROUTES)['auth'][keyof (typeof API_ROUTES)['auth']]

export type TAuthRoutes = keyof typeof AUTH_ROUTES

export type TAuthRoutess = (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES]

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
