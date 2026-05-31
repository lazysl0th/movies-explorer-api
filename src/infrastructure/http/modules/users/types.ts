import type { RequestHandler } from 'express'

import type {
  TGetProfileResponseDto,
  TUpdateUserProfileBodyDto,
  TUpdateUserProfileResponseDto,
} from '@app/dtos/UserDto.js'
import type {
  API_ROUTES,
  FULL_API_ROUTES,
} from '@infrastructure/config/routes.js'

export type TUsersFullRoutesValues =
  (typeof FULL_API_ROUTES)['users'][keyof (typeof FULL_API_ROUTES)['users']]

type TGetProfileParams = Record<string, never>
type TGetProfileBody = TGetProfileParams
export type TGetProfileHandler = RequestHandler<
  TGetProfileParams,
  TGetProfileResponseDto,
  TGetProfileBody
>

export type TUpdateProfileParams = TGetProfileParams

export type TUpdateProfileHandler = RequestHandler<
  TUpdateProfileParams,
  TUpdateUserProfileResponseDto,
  TUpdateUserProfileBodyDto
>

type TUsersRoutes = keyof typeof API_ROUTES.users

export type TUserValidations = Record<TUsersRoutes, RequestHandler>
