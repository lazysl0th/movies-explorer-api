import response from '../constants/response.js'

const { FORBIDDEN } = response

class Forbidden extends Error {
  constructor(message) {
    super(message)
    this.statusCode = FORBIDDEN.statusCode
  }
}

export default Forbidden
