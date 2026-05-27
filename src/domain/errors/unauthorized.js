import response from '../../infrastructure/constants/response.js'

const { UNAUTHORIZED } = response

class Unauthorized extends Error {
  constructor(message = UNAUTHORIZED.text) {
    super(message)
    this.statusCode = UNAUTHORIZED.statusCode
  }
}

export default Unauthorized
