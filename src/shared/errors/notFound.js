import response from '../constants/response.js'

const { NOT_FOUND } = response

class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = NOT_FOUND.statusCode
  }
}

export default NotFoundError
