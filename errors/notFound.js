const { NOT_FOUND } = require('../constant');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = NOT_FOUND.statusCode;
  }
}

module.exports = NotFoundError;
