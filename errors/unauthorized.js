const { UNAUTHORIZED } = require('../constant');

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED.statusCode;
  }
}

module.exports = Unauthorized;
