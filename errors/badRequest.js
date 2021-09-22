const { BAD_REQUEST } = require('../constant');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST.statusCode;
  }
}

module.exports = BadRequestError;
