import HttpStatusCode from '@infrastructure/constants/https-status-code.js'

import type { Response } from 'express'
import type { z } from 'zod'

const zodErrorHandler = (e: z.ZodError, res: Response): void => {
  res.status(HttpStatusCode.BadRequest).json({
    status: 'ValidationError',
    errors: e.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    })),
  })
}

export default zodErrorHandler
