const response = {
  OK: {
    statusCode: 200,
    text: 'Ok',
  },
  CREATED: {
    statusCode: 201,
  },
  BAD_REQUEST: {
    statusCode: 400,
    text: 'Invalid data provided',
  },
  UNAUTHORIZED: {
    statusCode: 401,
    text: 'Authorization required',
  },
  FORBIDDEN: {
    statusCode: 403,
    text: 'Access denied',
  },
  NOT_FOUND: {
    statusCode: 404,
    text: 'Nothing found',
  },
  CONFLICT: {
    statusCode: 409,
    text: 'A user with this email already exists',
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    text: 'An error occurred on the server',
  },
}

export default response
