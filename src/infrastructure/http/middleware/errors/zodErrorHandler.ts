import HttpStatusCode from '@infrastructure/constants/https-status-code.js'

import type { Response } from 'express'
import type { z } from 'zod'

const handleZodError = (error: z.ZodError, res: Response): void => {
  res.status(HttpStatusCode.BadRequest).json({
    status: 'ValidationError',
    errors: error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    })),
  })
}

export default handleZodError
