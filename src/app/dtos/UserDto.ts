import { authResponseSchema } from './AuthDto.js'

import type z from 'zod'

import type User from '@domain/entities/User.js'

export type TRequestUser = Pick<User, 'id'>

export const userProfileResponseSchema = authResponseSchema

export const updateUserProfileSchema = authResponseSchema.pick({
  name: true,
  email: true,
})

export type TGetProfileResponseDto = z.infer<typeof userProfileResponseSchema>

export type TUpdateUserProfileBodyDto = z.infer<typeof updateUserProfileSchema>

export type TUpdateUserProfileResponseDto = TGetProfileResponseDto
