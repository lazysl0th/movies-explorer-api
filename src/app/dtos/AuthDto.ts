import validator from 'validator'
import z from 'zod'

import VALIDATION_MESSAGES from '@infrastructure/constants/validation-responses.js'

const { email, password, name, auth, token } = VALIDATION_MESSAGES

export const signinSchema = z.object({
  email: z.email(email.invalidFormat).meta({
    description: email.description,
    example: email.example,
  }),
  password: z
    .string()
    .refine((value) => validator.isStrongPassword(value), {
      message: password.validate,
    })
    .meta({
      description: password.description,
      example: password.example,
    }),
})

export const signupSchema = signinSchema.extend({
  name: z.string().min(1, name.tooShort).max(30, name.tooLong).meta({
    description: name.description,
    example: name.example,
  }),
})

export const authResponseSchema = z.object({
  id: z.string().meta({
    description: auth.idDescription,
    example: auth.idExample,
  }),
  email: z.string().meta({
    description: auth.emailDescription,
    example: auth.emailExample,
  }),
  name: z.string().meta({
    description: auth.nameDescription,
    example: auth.nameExample,
  }),
})

export const authJwtPayloadSchema = z.object({
  id: z.string().meta({
    description: auth.idDescription,
    example: auth.idExample,
  }),
  iat: z.number().optional(),
  exp: z.number().optional(),
})

export const cookieTokenSchema = z.object({
  token: z.string(token.invalidFormat).min(1, token.required).meta({
    description: token.description,
    example: token.example,
  }),
})

export type TLoginBodyDto = z.infer<typeof signinSchema>

export type TRegisterBodyDto = z.infer<typeof signupSchema>

export type TAuthUserResponseDto = z.infer<typeof authResponseSchema>

export interface ILocalAuthResponseDto {
  user: TAuthUserResponseDto
  token: string
}
