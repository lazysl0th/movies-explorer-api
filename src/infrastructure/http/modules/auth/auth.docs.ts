import {
  authResponseSchema,
  signinSchema,
  signupSchema,
} from '@app/dtos/AuthDto.js'
import { FULL_API_ROUTES } from '@infrastructure/config/routes.js'
import HttpStatusCode from '@infrastructure/constants/https-status-code.js'

import type { ZodOpenApiPathItemObject } from 'zod-openapi'

import type { TAuthFullRoutesValues } from './types.js'

const authRoutesJson: Record<TAuthFullRoutesValues, ZodOpenApiPathItemObject> =
  {
    [FULL_API_ROUTES.auth.signin]: {
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
              'application/json': { schema: authResponseSchema },
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
    [FULL_API_ROUTES.auth.signup]: {
      post: {
        tags: ['Auth'],
        summary: 'User Registration',
        description:
          'Registers a new user with their credentials (e.g., name, email, and password) and returns the created user data or a JWT access token.',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: signupSchema },
          },
        },
        responses: {
          [HttpStatusCode.Created]: {
            description: 'User successfully registered.',
            content: {
              'application/json': { schema: authResponseSchema },
            },
          },
          [HttpStatusCode.BadRequest]: {
            description:
              'Validation Error. Sent when input data fails schema verification or email is already taken.',
          },
        },
      },
    },
    [FULL_API_ROUTES.auth.signout]: {
      post: {
        tags: ['Auth'],
        summary: 'User Logout',
        description:
          'Logs out the current user by invalidating their session or JWT token.',
        responses: {
          [HttpStatusCode.Ok]: {
            description: 'User successfully logged out.',
          },
          [HttpStatusCode.Unauthorized]: {
            description: 'Unauthorized. The user is not logged in.',
          },
        },
      },
    },
  }

export default authRoutesJson
