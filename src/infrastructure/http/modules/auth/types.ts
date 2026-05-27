import type { RequestHandler } from 'express'

import type { TLoginBodyDto, TLoginResponseDto } from '@app/dtos/UserDTO.js'
import type { API_ROUTES, AUTH_ROUTES } from '@infrastructure/config/routes.js'

export type TAuthFullRoutesValues =
  (typeof API_ROUTES)['auth'][keyof (typeof API_ROUTES)['auth']]

export type TAuthRoutes = keyof typeof AUTH_ROUTES

export type TAuthRoutess = (typeof AUTH_ROUTES)[keyof typeof AUTH_ROUTES]

export type TAuthValidations = Record<TAuthRoutes, RequestHandler>

type TLoginParams = Record<string, never>

export type TLoginHandler = RequestHandler<
  TLoginParams,
  TLoginResponseDto,
  TLoginBodyDto
>
