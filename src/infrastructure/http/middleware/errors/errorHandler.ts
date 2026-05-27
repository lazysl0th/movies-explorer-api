import z from 'zod'

import response from '@infrastructure/constants/response.js'

import handleZodError from './zodErrorHandler.js'

import type { ErrorRequestHandler } from 'express'

const { INTERNAL_SERVER_ERROR } = response

const errorHandler: ErrorRequestHandler = (e, _, res, next) => {
  console.log(e)

  if (res.headersSent) {
    next(e)
    return
  }

  if (e instanceof z.ZodError) {
    handleZodError(e, res)
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
