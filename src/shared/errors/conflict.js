const { CONFLICT } = require('../constants/response')

class Conflict extends Error {
  constructor(message) {
    super(message)
    this.statusCode = CONFLICT.statusCode
  }
}

module.exports = Conflict
