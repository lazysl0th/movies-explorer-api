import response from '../../infrastructure/constants/response.js'

const { NOT_FOUND } = response

class NotFoundError extends Error {
  constructor(message = NOT_FOUND.text) {
    super(message)
    this.statusCode = NOT_FOUND.statusCode
  }
}

export default NotFoundError
