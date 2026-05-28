import z from 'zod'

import DomainError from '@domain/errors/DomainError.js'
import response from '@infrastructure/constants/response.js'

import zodErrorHandler from './zodErrorsHandler.js'

import type { ErrorRequestHandler } from 'express'

const { INTERNAL_SERVER_ERROR } = response

const errorHandler: ErrorRequestHandler = (e, _, res, next) => {
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
    res.status(404).send({ message: e.code })
    return
  }

  const { statusCode = INTERNAL_SERVER_ERROR.statusCode, message } = e

  res.status(statusCode).send({
    message:
      statusCode === INTERNAL_SERVER_ERROR.statusCode
        ? INTERNAL_SERVER_ERROR.text
        : message,
  })
}

export default errorHandler
