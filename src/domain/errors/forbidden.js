import response from '../../infrastructure/constants/response.js'

const { FORBIDDEN } = response

class Forbidden extends Error {
  constructor(message = FORBIDDEN.text) {
    super(message)
    this.statusCode = FORBIDDEN.statusCode
  }
}

export default Forbidden
