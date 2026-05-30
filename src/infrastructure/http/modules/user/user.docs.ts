import { authResponseSchema, cookieTokenSchema } from '@app/dtos/AuthDto.js'
import { updateUserProfileSchema } from '@app/dtos/UserDto.js'
import { FULL_API_ROUTES } from '@infrastructure/config/routes.js'
import HttpStatusCode from '@infrastructure/constants/https-status-code.js'

import type { ZodOpenApiPathItemObject } from 'zod-openapi'

import type { TUsersFullRoutesValues } from './types.js'

const userRoutesJson: Record<TUsersFullRoutesValues, ZodOpenApiPathItemObject> =
  {
    [FULL_API_ROUTES.users.me]: {
      get: {
        tags: ['Users'],
        summary: 'Get User Profile',
        description:
          'Retrieves the detailed profile information of a user by their unique identifier. Requires authentication.',
        requestParams: {
          cookie: cookieTokenSchema,
        },
        security: [{ cookieAuth: [] }],
        responses: {
          [HttpStatusCode.Ok]: {
            description: 'Successfully retrieved user profile data.',
            content: {
              'application/json': { schema: authResponseSchema },
            },
          },
          [HttpStatusCode.Unauthorized]: {
            description:
              'Unauthorized. Missing or invalid authentication token.',
          },
        },
      },
      patch: {
        tags: ['Users'],
        summary: 'Update User Profile',
        description:
          'Updates the profile information of the currently authenticated user. Fields are optional; only provided fields will be updated.',
        requestParams: {
          cookie: cookieTokenSchema,
        },
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: updateUserProfileSchema },
          },
        },
        security: [{ cookieAuth: [] }],
        responses: {
          [HttpStatusCode.Ok]: {
            description: 'User profile successfully updated.',
            content: {
              'application/json': { schema: authResponseSchema }, // Возвращаем обновленный профиль
            },
          },
          [HttpStatusCode.BadRequest]: {
            description: 'Bad Request. Invalid input data.',
          },
          [HttpStatusCode.Unauthorized]: {
            description:
              'Unauthorized. Missing or invalid authentication token.',
          },
        },
      },
    },
  }

export default userRoutesJson
