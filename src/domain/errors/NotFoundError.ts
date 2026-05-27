import DomainError from './DomainError.js'

type TEntity = 'User'

export default class NotFoundError extends DomainError {
  readonly code: string

  constructor(entityName: TEntity, entityId: string) {
    const uppercaseCode = entityName
    super(`${entityName} with id ${entityId} was not found.`)
    this.code = `${uppercaseCode.toUpperCase()}.NOT_FOUND`
  }
}
