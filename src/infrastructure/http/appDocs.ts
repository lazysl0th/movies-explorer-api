import { createDocument } from 'zod-openapi'

import config from '@infrastructure/config/env.config.js'

import authRoutesJson from './modules/auth/authDocs.js'
import movieRoutesJson from './modules/movies/movieDocs.js'
import userRoutesJson from './modules/users/userDocs.js'

import type { ZodOpenApiObject } from 'zod-openapi'

export const appRoutesJson: ZodOpenApiObject = {
  openapi: '3.1.1',
  info: {
    title: 'Movies Explorer API (Zod v4 Ultimate)',
    version: '1.0.0',
    description:
      'API documentation utilizing the modern Zod v4 .meta() syntax.',
  },
  servers: [
    {
      url: config.BACKEND_URL,
      description: 'v1 Core API',
    },
  ],
  tags: [
    {
      name: 'Auth',
      description: 'Authentication endpoints',
    },
    {
      name: 'Users',
      description: 'User profile management, retrieval, and account operations',
    },
    {
      name: 'Movies',
      description:
        "User's favorite movies management, including saving, retrieving, and removing titles.",
    },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'token',
        description: 'JWT authentication token stored in cookies',
      },
    },
  },

  paths: {
    ...authRoutesJson,
    ...userRoutesJson,
    ...movieRoutesJson,
  },
}

const openApiDocumentation: ReturnType<typeof createDocument> =
  createDocument(appRoutesJson)

export default openApiDocumentation
