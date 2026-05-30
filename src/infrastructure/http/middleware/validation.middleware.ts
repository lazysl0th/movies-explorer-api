import type { RequestHandler } from 'express'
import type z from 'zod'

export const validateBody =
  (schema?: z.ZodTypeAny): RequestHandler =>
  async (req, _, next): Promise<void> => {
    if (schema) await schema.parseAsync(req.body)
    next()
  }

export const validateParams =
  (schema?: z.ZodTypeAny): RequestHandler =>
  async (req, _, next): Promise<void> => {
    if (schema) await schema.parseAsync(req.params)
    next()
  }
