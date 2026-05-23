import response from '../constants/response.js'

const { BAD_REQUEST } = response

class BadRequestError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = BAD_REQUEST.statusCode
  }
}

export default BadRequestError
