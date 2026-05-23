const { NOT_FOUND } = require('../constants/response')

class NotFoundError extends Error {
  constructor(message) {
    super(message)
    this.statusCode = NOT_FOUND.statusCode
  }
}

module.exports = NotFoundError
