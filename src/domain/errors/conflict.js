import response from '../../infrastructure/constants/response.js'

const { CONFLICT } = response

class Conflict extends Error {
  constructor(message) {
    super(message)
    this.statusCode = CONFLICT.statusCode
  }
}

export default Conflict
