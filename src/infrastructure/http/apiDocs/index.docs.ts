import { createDocument } from 'zod-openapi'

import config from '@infrastructure/config/env.js'
import { API_PREFIX } from '@infrastructure/config/routes.js'

import authRoutesJson from '../modules/auth/auth.docs.js'

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
      url: config.BACKEND_URL + API_PREFIX,
      description: 'v1 Core API',
    },
  ],
  tags: [
    {
      name: 'Auth',
      description: 'Authentication endpoints',
    },
  ],

  paths: {
    ...authRoutesJson,
  },
}

const openApiDocumentation: Record<string, any> = createDocument(appRoutesJson)

export default openApiDocumentation
