import { createDocument } from 'zod-openapi'

import config from '@infrastructure/config/env.js'
import { API_PREFIX } from '@infrastructure/config/routes.js'

import authRoutesJson from '../modules/auth/auth.docs.js'
import userRoutesJson from '../modules/user/user.docs.js'

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
  },
}

const openApiDocumentation: Record<string, any> = createDocument(appRoutesJson)

export default openApiDocumentation
