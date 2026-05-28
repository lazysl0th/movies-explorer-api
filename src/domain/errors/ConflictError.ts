import DomainError from './DomainError.js'

import type { TEntity } from '@domain/entities/types.js'

export default class ConflictError extends DomainError {
  readonly code: string

  constructor(entityName: TEntity) {
    super(`${entityName} already exists`)
    this.code = `${entityName.toUpperCase()}.CONFLICT`
  }
}
