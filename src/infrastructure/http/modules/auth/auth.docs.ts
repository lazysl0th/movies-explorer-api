import { API_ROUTES } from '@infrastructure/config/routes.js'
import HttpStatusCode from '@infrastructure/constants/https-status-code.js'

import { signinResponseSchema, signinSchema } from './auth.validation.js'

import type { ZodOpenApiPathItemObject } from 'zod-openapi'

import type { TAuthFullRoutesValues } from './types.js'

const authRoutesJson: Record<TAuthFullRoutesValues, ZodOpenApiPathItemObject> =
  {
    [API_ROUTES.auth.signin]: {
      post: {
        tags: ['Auth'],
        summary: 'User Authentication',
        description:
          'Accepts user credentials (email and password) and returns a JWT access token.',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: signinSchema },
          },
        },
        responses: {
          [HttpStatusCode.Ok]: {
            description: 'Successfully authenticated. Returns access token.',
            content: {
              'application/json': { schema: signinResponseSchema },
            },
          },
          [HttpStatusCode.BadRequest]: {
            description:
              'Validation Error. Sent when input data fails schema verification.',
          },
          [HttpStatusCode.Unauthorized]: {
            description: 'Unauthorized. Invalid email or password provided.',
          },
        },
      },
    },
  }

export default authRoutesJson
