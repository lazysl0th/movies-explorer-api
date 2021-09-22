const { CONFLICT } = require('../constant');

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT.statusCode;
  }
}

module.exports = Conflict;
