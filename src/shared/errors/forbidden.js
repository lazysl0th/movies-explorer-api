const { FORBIDDEN } = require('../constants/response')

class Forbidden extends Error {
  constructor(message) {
    super(message)
    this.statusCode = FORBIDDEN.statusCode
  }
}

module.exports = Forbidden
