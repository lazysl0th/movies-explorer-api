import DomainError from './DomainError.js'

export default class ForbiddenError extends DomainError {
  readonly code: string

  constructor() {
    super(`Insufficient permissions`)
    this.code = `FORBIDDEN`
  }
}
