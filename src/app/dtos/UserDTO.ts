import type z from 'zod'

import type {
  signinResponseSchema,
  signinSchema,
} from '@infrastructure/http/modules/auth/auth.validation.js'

export type TLoginBodyDto = z.infer<typeof signinSchema>

export type TLoginResponseDto = z.infer<typeof signinResponseSchema>
