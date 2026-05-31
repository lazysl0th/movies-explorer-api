import z from 'zod'

import DomainError from '@domain/errors/DomainError.js'
import HttpStatusCode from '@infrastructure/constants/https-status-code.js'
import httpResponseMap from '@infrastructure/constants/response.js'

import zodErrorHandler from './zodErrorsHandler.js'

import type { ErrorRequestHandler } from 'express'

const errorsHandler: ErrorRequestHandler = (e, _, res, next) => {
  console.log(e)

  if (res.headersSent) {
    next(e)
    return
  }

  if (e instanceof z.ZodError) {
    zodErrorHandler(e, res)
    return
  }

  if (e instanceof DomainError) {
    const meta = httpResponseMap[e.code]

    if (meta) {
      res.status(meta.status).send({
        error: e.code,
        i18nKey: meta.i18nKey,
      })
      return
    }
  }

  res.status(HttpStatusCode.InternalServerError).send({
    error: 'INTERNAL_SERVER_ERROR',
    i18nKey: 'errors.system.internal',
  })
}

export default errorsHandler
