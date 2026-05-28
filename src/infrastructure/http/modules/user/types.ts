import type { RequestHandler } from 'express'

import type { TGetProfileResponseDto, TRequestUser } from '@app/dtos/UserDto.js'
import type { FULL_API_ROUTES } from '@infrastructure/config/routes.js'

export type TUsersFullRoutesValues =
  (typeof FULL_API_ROUTES)['users'][keyof (typeof FULL_API_ROUTES)['users']]

type TGetProfileParams = Record<string, never>
type TGetProfileBody = Record<string, never>
export type TGetProfileHandler = RequestHandler<
  TGetProfileParams,
  TGetProfileResponseDto,
  TGetProfileBody,
  TRequestUser
>
