import type z from 'zod'

import type {
  authResponseSchema,
  signinSchema,
  signupSchema,
} from '@infrastructure/http/modules/auth/auth.validation.js'

export type TLoginBodyDto = z.infer<typeof signinSchema>

export type TRegisterBodyDto = z.infer<typeof signupSchema>

export type TAuthResponseDto = z.infer<typeof authResponseSchema>
