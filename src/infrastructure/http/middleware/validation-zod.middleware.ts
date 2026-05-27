import type { RequestHandler } from 'express'
import type z from 'zod'

const validateBody =
  (schema: z.ZodTypeAny): RequestHandler =>
  async (req, _, next): Promise<void> => {
    req.body = await schema.parseAsync(req.body)
    next()
  }

export default validateBody
