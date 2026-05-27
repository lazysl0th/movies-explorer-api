import z from 'zod'

import VALIDATION_MESSAGES from '@infrastructure/constants/validation-responses.js'

const { EMAIL, PASSWORD, AUTH } = VALIDATION_MESSAGES

export const signinSchema = z.object({
  email: z.email(EMAIL.invalidFormat).meta({
    description: EMAIL.description,
    example: EMAIL.example,
  }),
  password: z.string().min(8, PASSWORD.tooShort).meta({
    description: PASSWORD.description,
    example: PASSWORD.example,
  }),
})

export const signinResponseSchema = z.object({
  id: z.string().meta({
    description: AUTH.idDescription,
    example: AUTH.idExample,
  }),
  email: z.string().meta({
    description: AUTH.emailDescription,
    example: AUTH.emailExample,
  }),
  name: z.string().meta({
    description: AUTH.nameDescription,
    example: AUTH.nameExample,
  }),
})
