import response from '@infrastructure/constants/response.js'

import type { ErrorRequestHandler } from 'express'

const { INTERNAL_SERVER_ERROR } = response

const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  console.log(err)
  const { statusCode = INTERNAL_SERVER_ERROR.statusCode, message } = err

  res.status(statusCode).send({
    message:
      statusCode === INTERNAL_SERVER_ERROR.statusCode
        ? INTERNAL_SERVER_ERROR.text
        : message,
  })
}

export default errorHandler
