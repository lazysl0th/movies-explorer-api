import DomainError from './DomainError.js'

import type { TEntity } from '@domain/entities/types.js'

export default class NotFoundError extends DomainError {
  readonly code: string

  constructor(entityName: TEntity, entityId: string) {
    super(`${entityName} with id ${entityId} was not found.`)
    this.code = `${entityName.toUpperCase()}.NOT_FOUND`
  }
}
